import { Server } from "hapi";

import { defaults } from "./config";
import { IServerConfig } from "./config/defaults";
import { ENVIRONMENT_PROD } from "./config/environments";
import { APIServer, BASE_PREFIX, createServer } from "./server";
import { escapeRegexString } from "./utils/misc";

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

  it("should not auto create a server instance", () => {
    const testServer: APIServer = new APIServer(undefined, false);
    expect(testServer.get()).toBeUndefined();
  });

  it("should use production config", () => {
    const prodConfig: IServerConfig = defaults(ENVIRONMENT_PROD);
    const customConfigServer = new APIServer(prodConfig);
    expect(customConfigServer.config).toEqual(prodConfig);
  });

  it("should throw error on server.start", () => {
    expect(server.start).toThrow();
  });

  it("should throw error on server.stop", () => {
    expect(server.stop).toThrow();
  });

  it("should throw error on server.restart", () => {
    expect(server.restart).toThrow();
  });

  it("should create a hapi server object with supplied config", () => {
    const createdServer: Server = createServer({
      env: ENVIRONMENT_PROD,
      port: 1111,
      baseURL: "/v1"
    });
    expect(createdServer).toBeInstanceOf(Server);
    expect(createdServer.info!.port).toBe(1111);

    testRoutes(
      createdServer,
      new RegExp(escapeRegexString(`/v1${BASE_PREFIX}`), "g")
    );
  });

  it("should create a hapi server with default config", () => {
    const { port, baseURL } = defaults();
    const createdServer: Server = createServer();

    expect(createdServer).toBeInstanceOf(Server);
    expect(createdServer.info!.port).toBe(port);

    testRoutes(
      createdServer,
      new RegExp(escapeRegexString(`${baseURL}${BASE_PREFIX}`), "g")
    );
  });
});

function testRoutes(server: Server, routeReg: RegExp): void {
  const routes = server.connections[0].table();
  expect(routes).toBeInstanceOf(Array);
  expect(routes.length).toBeGreaterThan(0);

  routes.forEach(route => expect(route.path.match(routeReg)).toBeTruthy());
}
