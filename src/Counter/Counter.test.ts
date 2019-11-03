import { increment, decrement } from "./Counter";

test("increment of 0 is 1", () => {
  expect(increment(0)).toBe(1);
});

test("decrement of 0 is -1", () => {
  expect(decrement(0)).toBe(-1);
});
