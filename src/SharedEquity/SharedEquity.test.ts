import { getProportions } from "./SharedEquity";

test("getProportions returns [1] for [1]", () => {
  expect(getProportions(["1"])).toStrictEqual(["1.000"]);
});
