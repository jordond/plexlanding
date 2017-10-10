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

  // TODO add check to make sure server restarts with new config
  it("should throw error on server.restart", () => {
    const restartTest = () => server.restart(defaults());
    expect(restartTest).toThrow();
    expect(server.restart).toThrow();
  });

  describe("Creating Hapi Server", () => {
    it("should use supplied config", () => {
      const createdServer: Server = createServer({
        port: 1111,
        baseURL: "/v1"
      });
      expect(createdServer).toBeInstanceOf(Server);
      expect(createdServer.info!.port).toBe(1111);

      testRoutes(createdServer, `/v1${BASE_PREFIX}`);
    });

    it("should have a default port if not passed but baseURL was", () => {
      const { port: defaultPort } = defaults();
      const createdServer: Server = createServer({
        baseURL: "/foo"
      });

      expect(createdServer.info!.port).toBe(defaultPort);
    });

    it("should use supplied port", () => {
      const port = 8666;
      const createdServer: Server = createServer({ port });
      expect(createdServer.info!.port).toBe(port);
    });

    it("should use custom base URL", () => {
      const { baseURL } = { ...defaults(), baseURL: "/superTest" };
      const createdServer: Server = createServer({ baseURL });
      testRoutes(createdServer, `${baseURL}${BASE_PREFIX}`);
    });

    it("should use the default config", () => {
      const { port, baseURL } = defaults();
      const createdServer: Server = createServer();

      expect(createdServer).toBeInstanceOf(Server);
      expect(createdServer.info!.port).toBe(port);

      testRoutes(createdServer, `${baseURL}${BASE_PREFIX}`);
    });
  });
});

function testRoutes(server: Server, routeRegStr: string): void {
  const routes = server.connections[0].table();
  const reg: RegExp = new RegExp(escapeRegexString(routeRegStr), "g");

  expect(routes).toBeInstanceOf(Array);
  expect(routes.length).toBeGreaterThan(0);

  routes.forEach(route => expect(route.path.match(reg)).toBeTruthy());
}
