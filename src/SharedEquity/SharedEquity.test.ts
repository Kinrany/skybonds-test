import { getProportions } from "./SharedEquity";

test("getProportions returns [1] for [1]", () => {
  expect(getProportions(["1"])).toStrictEqual(["1.000"]);
});

test("getProportions returns [.5, .5] for [1, 1]", () => {
  expect(getProportions(["1", "1"])).toStrictEqual(["0.500", "0.500"]);
});

test("getProportions returns [.1, .9] for [1, 9]", () => {
  expect(getProportions(["1", "9"])).toStrictEqual(["0.100", "0.900"]);
});

test("getProportions throws when called with an invalid string", () => {
  expect(() => getProportions(["not a number"])).toThrow();
});

test("getProportions throws when called with a negative number", () => {
  expect(() => getProportions(["3", "1", "-1"])).toThrow();
});

test("getProportions works with zeroes", () => {
  expect(getProportions(["4", "3", "2", "1", "0"])).toStrictEqual([
    "0.400",
    "0.300",
    "0.200",
    "0.100",
    "0.000",
  ]);
});

test("getProportions returns all zeroes when the sum is zero", () => {
  expect(getProportions(["0", "0"])).toStrictEqual(["0.000", "0.000"]);
});

test("getProportions works with real numbers", () => {
  expect(getProportions(["0.2", "0.4", "0.2"])).toStrictEqual([
    "0.250",
    "0.500",
    "0.250",
  ]);
});

test("getProportions can handle an array of length 10^6 in under 5 seconds", () => {
  const input = Array(1000 * 1000)
    .fill(0)
    .map(_ => Math.random().toString());
  const t0 = process.hrtime();
  getProportions(input);
  const [s, ns] = process.hrtime(t0);
  expect(s + ns / Math.pow(10, 9)).toBeLessThan(5);
});
