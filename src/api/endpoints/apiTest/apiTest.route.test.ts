import { register } from "./apiTest.route";

describe("API Test's routes", () => {
  const routes = register();

  test("should have two routes", () => {
    expect(routes).toHaveLength(2);
  });

  test("should have 2 GET routes", () => {
    const gets = routes.filter(x => x.method === "GET");
    expect(gets).toHaveLength(2);
  });
});
