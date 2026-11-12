"use client";

// Local stand-ins for @genonai/admin-design-system components (the package is
// private). Names, states and class names mirror the showcase demos so a later
// swap to the real imports only changes import paths.
import { Check, ChevronDown, Search, SearchX, TriangleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "tertiary" | "ghost";
type ButtonSize = "sm" | "md";

const BUTTON_BASE =
  "inline-flex shrink-0 items-center justify-center gap-group-xs whitespace-nowrap rounded-xs outline-none transition-all cursor-pointer focus-visible:ring focus-visible:ring-border-subtle disabled:pointer-events-none";
const BUTTON_SIZE: Record<ButtonSize, string> = {
  sm: "h-size-control-sm min-w-[64px] px-inline-md py-stack-xs typography-label-sm-regular",
  md: "h-size-control-md min-w-[80px] px-inline-lg py-stack-sm typography-label-md-medium",
};
const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-action-primary-default text-text-inverse hover:bg-action-primary-hover disabled:bg-action-disabled disabled:text-text-disabled",
  tertiary:
    "border border-border-tertiary-default bg-action-transparent-white text-text-secondary hover:bg-action-tertiary-subtle active:bg-action-tertiary-subtle-hover disabled:border-border-disabled disabled:text-text-disabled",
  ghost: "bg-transparent text-text-secondary hover:bg-action-tertiary-subtle disabled:text-text-disabled",
};

export function buttonClass(variant: ButtonVariant = "tertiary", size: ButtonSize = "sm") {
  return cn(BUTTON_BASE, BUTTON_SIZE[size], BUTTON_VARIANT[variant]);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button type="button" className={cn(buttonClass(variant, size), className)} {...props} />;
}

export function LinkButton({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <a target="_blank" rel="noreferrer" className={cn(buttonClass(variant, size), className)} {...props} />
  );
}

type TagColor = "base" | "gray" | "brand" | "green" | "red" | "orange" | "blue" | "purple";
const TAG_TEXT: Record<TagColor, string> = {
  base: "text-text-secondary",
  gray: "text-text-tertiary",
  brand: "text-text-brand-default",
  green: "text-text-success-default",
  red: "text-text-danger-default",
  orange: "text-text-warning-default",
  blue: "text-text-info-default",
  purple: "text-text-category-default",
};

export function Tag({
  color = "base",
  size = "small",
  children,
}: {
  color?: TagColor;
  size?: "small" | "xsmall";
  children: ReactNode;
}) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex min-w-[24px] max-w-full items-center justify-center gap-group-xs whitespace-nowrap rounded-full bg-surface-subtle px-inline-sm py-stack-xxs typography-label-sm-medium",
        size === "small" ? "h-[24px]" : "h-[20px]",
        TAG_TEXT[color],
      )}
    >
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

type BadgeStatus = "success" | "warning" | "error" | "processing" | "default" | "disabled";
const BADGE_DOT: Record<BadgeStatus, string> = {
  success: "bg-icon-success-default",
  warning: "bg-icon-warning-default",
  error: "bg-icon-danger-default",
  processing: "bg-icon-info-default",
  default: "bg-icon-tertiary",
  disabled: "bg-icon-disabled",
};

export function Badge({ status, children }: { status: BadgeStatus; children: ReactNode }) {
  return (
    <span
      data-slot="badge"
      data-status={status}
      className="inline-flex shrink-0 items-center gap-group-xs whitespace-nowrap typography-label-sm-medium text-text-secondary"
    >
      <span aria-hidden className="inline-flex size-[12px] shrink-0 items-center justify-center">
        <span className={cn("inline-block size-[8px] rounded-full", BADGE_DOT[status])} />
      </span>
      {children}
    </span>
  );
}

export function Chip({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-size-control-xxs cursor-pointer items-center gap-group-xs whitespace-nowrap rounded-xxs px-inline-sm py-stack-xxs typography-label-md-regular transition-shadow disabled:cursor-not-allowed",
        disabled
          ? "pointer-events-none bg-surface-subtle text-text-disabled"
          : selected
            ? "bg-surface-default text-text-brand-default shadow-default-md"
            : "bg-surface-default text-text-secondary shadow-default-sm hover:shadow-default-md",
      )}
    >
      {selected ? <Check aria-hidden className="size-size-icon-xs" strokeWidth={2.5} /> : null}
      {children}
    </button>
  );
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="segmented-control"
      className="inline-flex h-size-control-md w-fit max-w-full items-center gap-group-xs overflow-x-auto rounded-xs bg-surface-subtle px-inline-xs py-stack-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            data-state={on ? "on" : "off"}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex h-size-control-xs min-w-[20px] shrink-0 cursor-pointer items-center justify-center gap-group-xs rounded-xxs px-inline-sm py-stack-xs transition-colors",
              on
                ? "bg-surface-default text-text-secondary shadow-default-sm typography-body-md-medium"
                : "bg-transparent text-text-tertiary typography-body-md-regular hover:text-text-secondary",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const CONTROL_SHELL =
  "flex h-size-control-md items-center rounded-xs bg-surface-subtle px-inline-md py-stack-xs focus-within:ring-1 focus-within:ring-border-primary-default";

export function SearchField({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  return (
    <div className={cn(CONTROL_SHELL, "gap-group-sm", className)}>
      <Search aria-hidden className="size-size-icon-sm shrink-0 text-icon-secondary" />
      <input
        type="search"
        className="min-w-0 flex-1 border-none bg-transparent text-text-primary outline-none typography-label-md-regular placeholder:text-text-tertiary"
        {...props}
      />
    </div>
  );
}

/** FilterDropdown trigger look ("라벨 | 값 ▾") over a native select. */
export function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <label className={cn(CONTROL_SHELL, "relative shrink-0 cursor-pointer gap-group-sm")}>
      <span className="whitespace-nowrap text-text-tertiary typography-label-md-regular">{label}</span>
      <span aria-hidden className="inline-block h-size-icon-xs w-px shrink-0 bg-border-default" />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="cursor-pointer appearance-none bg-transparent pr-inline-xl text-text-primary outline-none typography-label-md-medium"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-inline-md size-size-icon-sm text-icon-secondary"
      />
    </label>
  );
}

export function PageHeader({
  title,
  description,
  meta,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: { label: string; value: ReactNode }[];
}) {
  return (
    <header data-slot="page-header" className="flex w-full flex-col gap-group-lg">
      <div className="flex flex-col gap-group-sm">
        <h1 className="min-w-0 break-words text-text-primary typography-headline-xl">{title}</h1>
        {description ? (
          <p className="text-text-secondary typography-body-lg-medium">{description}</p>
        ) : null}
      </div>
      {meta?.length ? (
        <div className="flex flex-wrap items-center gap-x-group-lg gap-y-group-xs">
          {meta.map((m) => (
            <div key={m.label} className="flex items-center gap-group-xs whitespace-nowrap">
              <span className="text-text-tertiary typography-body-md-regular">{m.label}</span>
              <span className="text-text-secondary typography-body-md-medium">{m.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export function EmptyState({
  type,
  title,
  description,
  action,
}: {
  type: "noResult" | "error";
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  const Icon = type === "error" ? TriangleAlert : SearchX;
  return (
    <section
      data-slot="empty-state"
      data-empty-type={type}
      className="flex flex-col items-center gap-group-lg px-inline-xxl py-stack-xxxxl"
    >
      <Icon
        aria-hidden
        strokeWidth={1.5}
        className={cn(
          "size-size-icon-xxl shrink-0",
          type === "error" ? "text-icon-danger-default" : "text-icon-muted",
        )}
      />
      <div className="flex flex-col items-center gap-group-xs">
        <p className="text-center text-text-primary typography-headline-md">{title}</p>
        {description ? (
          <p className="text-center text-text-secondary typography-body-md-regular">{description}</p>
        ) : null}
      </div>
      {action}
    </section>
  );
}
