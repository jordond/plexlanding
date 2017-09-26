import {
  RouteConfiguration,
  Server as HapiServer,
  ServerConnectionOptions
} from "hapi";

import { defaults } from "./config";
import { IServerConfig } from "./config/defaults";

import routes from "./endpoints";

export const BASE_PREFIX: string = "/api";

export class APIServer {
  public config: IServerConfig;
  private serverInstance: HapiServer;
  public constructor(
    config: IServerConfig = defaults,
    autoCreate: boolean = true
  ) {
    this.config = config;
    if (autoCreate) {
      this.serverInstance = createServer(this.config);
    }
  }

  public get(): HapiServer {
    return this.serverInstance;
  }

  public start(): Promise<boolean> {
    console.warn("Not yet implemented");
    return Promise.resolve(false);
  }

  public stop(): Promise<boolean> {
    console.warn("Not yet implemented");
    return Promise.resolve(false);
  }

  public restart(newConfig: IServerConfig = this.config): Promise<boolean> {
    console.warn("Not yet implemented");
    return Promise.resolve(false);
  }
}

export function createServer(config: IServerConfig = defaults): HapiServer {
  const port = config.port;
  const server = new HapiServer();

  const serverConfig: ServerConnectionOptions = {
    port,
    routes: {
      cors: true
    }
  };

  server.connection(serverConfig);

  // TODO add debug logging for each route registered
  const baseURL: string = `${config.baseURL || ""}${BASE_PREFIX}`;
  const prefixedRoutes: RouteConfiguration[] = routes.map(x => {
    x.path = baseURL + x.path;
    return x;
  });

  prefixedRoutes.forEach(x => server.route(x));

  return server;
}
