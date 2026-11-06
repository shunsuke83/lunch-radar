import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "Save a lunch spot then list and pick it.",
  async test(t) {
    await t.send(
      '을지로 "황소국밥"을 한식 맛집으로 저장해. 메모는 머릿고기 국밥. 태그는 국밥.',
    );
    t.succeeded();
    t.calledTool("upsert-restaurant");

    await t.send("저장된 맛집 목록 보여줘");
    t.succeeded();
    t.calledTool("list-restaurants");

    await t.send("오늘 점심 뭐 먹지? 한식");
    t.succeeded();
    t.calledTool("pick-lunch");
  },
});
