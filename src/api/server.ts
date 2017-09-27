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
    config: IServerConfig = defaults(),
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
    throw new Error("Not yet implemented");
  }

  public stop(): Promise<boolean> {
    throw new Error("Not yet implemented");
  }

  public restart(newConfig: IServerConfig = this.config): Promise<boolean> {
    throw new Error("Not yet implemented");
  }
}

export function createServer(
  { port, baseURL = "" }: IServerConfig = defaults()
): HapiServer {
  const server = new HapiServer();

  const serverConfig: ServerConnectionOptions = {
    port,
    routes: {
      cors: true
    }
  };

  server.connection(serverConfig);

  // TODO add debug logging for each route registered
  const combinedBaseURL: string = `${baseURL || ""}${BASE_PREFIX}`;
  const prefixedRoutes: RouteConfiguration[] = routes.map(x => {
    const path = combinedBaseURL + x.path;
    return { ...x, path };
  });

  prefixedRoutes.forEach(x => server.route(x));

  return server;
}
