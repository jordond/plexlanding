import register from "./apiTest.route";

describe("API Test's routes", () => {
  const routes = register();

  test("should have two routes", () => {
    expect(routes).toHaveLength(2);
  });
});
