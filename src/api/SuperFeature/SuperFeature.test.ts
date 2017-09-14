import * as SuperFeature from "./SuperFeature";

test("multiplies 2 * 2 to equal 4", () => {
  expect(SuperFeature.multiply(2, 2)).toBe(4);
});

test("squares 2 to equal 4", () => {
  expect(SuperFeature.square(2)).toBe(4);
});

test("raises 2 to the power 4", () => {
  expect(SuperFeature.square(2, 4)).toBe(16);
});

test("raises 1 to the power of 1", () => {
  expect(SuperFeature.square(1, 1)).toBe(1);
});
