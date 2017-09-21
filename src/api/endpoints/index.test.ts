import { RouteConfiguration } from "hapi";

import endpoints from "./";

it("should export an array", () => {
  expect(endpoints).toBeInstanceOf(Array);
});

it("should be a flattened array", () => {
  const flattened: RouteConfiguration[] = [].concat.apply([], endpoints);
  expect(endpoints).toEqual(flattened);
});

it("should contain a list of objects with require route properties", () => {
  endpoints.forEach(x => {
    expect(x).toEqual(
      expect.objectContaining({
        handler: expect.any(Function),
        method: expect.stringMatching(/GET|POST|PUT|PATCH|DELETE|OPTIONS/i),
        path: expect.stringMatching(/^\//)
      })
    );
  });
});
