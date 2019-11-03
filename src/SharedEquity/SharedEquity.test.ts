import { getProportions } from "./SharedEquity";

test("getProportions returns [1] for [1]", () => {
  expect(getProportions(["1"])).toStrictEqual(["1.000"]);
});

test("getProportions returns [.5, .5] for [1, 1]", () => {
  expect(getProportions(["1", "1"])).toStrictEqual(["0.500", "0.500"]);
});
