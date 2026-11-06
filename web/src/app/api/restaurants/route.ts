import { NextRequest, NextResponse } from "next/server";
import {
  filterRestaurants,
  loadCatalog,
  saveCatalog,
  uniqueTags,
  uniqueValues,
  type Restaurant,
  type RestaurantCatalog,
} from "@/lib/restaurants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const catalog = await loadCatalog();
    const { searchParams } = request.nextUrl;
    const filtered = filterRestaurants(catalog.restaurants, {
      q: searchParams.get("q") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      area: searchParams.get("area") ?? undefined,
      tag: searchParams.get("tag") ?? undefined,
    });

    return NextResponse.json({
      updatedAt: catalog.updatedAt,
      source: catalog.source,
      total: catalog.restaurants.length,
      count: filtered.length,
      restaurants: filtered,
      facets: {
        categories: uniqueValues(catalog.restaurants, "category"),
        areas: uniqueValues(catalog.restaurants, "area"),
        tags: uniqueTags(catalog.restaurants),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load restaurants",
      },
      { status: 500 },
    );
  }
}

type ImportBody = {
  restaurants?: Restaurant[];
  source?: string;
  replace?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const expected = process.env.IMPORT_TOKEN?.trim();
    if (process.env.NODE_ENV === "production") {
      if (!expected) {
        return NextResponse.json(
          { error: "Import disabled (IMPORT_TOKEN not configured)" },
          { status: 403 },
        );
      }
      const got = request.headers.get("x-import-token")?.trim();
      if (!got || got !== expected) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = (await request.json()) as ImportBody;
    if (!Array.isArray(body.restaurants)) {
      return NextResponse.json(
        { error: "restaurants array is required" },
        { status: 400 },
      );
    }

    const existing = await loadCatalog().catch(
      (): RestaurantCatalog => ({
        updatedAt: new Date().toISOString(),
        source: "import",
        restaurants: [],
      }),
    );

    // data/restaurants.json is published publicly; drop Slack identifiers.
    const incomingRestaurants = body.restaurants.map((r) => ({
      ...r,
      source: undefined,
    }));

    let restaurants: Restaurant[];
    if (body.replace) {
      restaurants = incomingRestaurants;
    } else {
      const bySlug = new Map(existing.restaurants.map((r) => [r.slug, r]));
      for (const incoming of incomingRestaurants) {
        if (!incoming?.slug || !incoming?.name) continue;
        const prior = bySlug.get(incoming.slug);
        bySlug.set(incoming.slug, {
          ...prior,
          ...incoming,
          tags: incoming.tags ?? prior?.tags ?? [],
          mentionCount: Math.max(
            prior?.mentionCount ?? 0,
            incoming.mentionCount ?? 0,
          ),
          addedAt: prior?.addedAt ?? incoming.addedAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      restaurants = [...bySlug.values()];
    }

    const catalog: RestaurantCatalog = {
      updatedAt: new Date().toISOString(),
      source: body.source ?? "slack-export",
      lastMessageTs: existing.lastMessageTs,
      restaurants,
    };
    await saveCatalog(catalog);

    return NextResponse.json({
      ok: true,
      count: restaurants.length,
      updatedAt: catalog.updatedAt,
      source: catalog.source,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to import restaurants",
      },
      { status: 500 },
    );
  }
}
