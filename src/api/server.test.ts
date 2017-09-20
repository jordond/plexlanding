import { Server } from "hapi";

import { APIServer, BASE_PREFIX } from "./server";

// TODO finish tests

describe("API Server", () => {
  let server: APIServer;

  beforeEach(() => {
    server = new APIServer();
  });

  it("should export the base prefix with the value of /api", () => {
    expect(BASE_PREFIX).toBe("/api");
  });

  it("should have a returns a server instance, with default settings", () => {
    expect(server.get()).toBeInstanceOf(Server);
  });
});
