import endpoints from "./";

it("should export an array", () => {
  expect(endpoints).toBeInstanceOf(Array);
});

// TODO ensure route has at least the 3 main keys
