import { RouteConfiguration, Server as HapiServer } from "hapi";

import { defaults } from "./config";
import { IServerConfig } from "./config/defaults";

import routes from "./endpoints";

export const BASE_PREFIX: string = "/api";

export class APIServer {
  public config: IServerConfig;
  private serverInstance: HapiServer;
  public constructor(config?: IServerConfig, autoCreate: boolean = true) {
    this.config = config || defaults();
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
  { port = defaults().port, baseURL = "" }: IServerConfig = {}
): HapiServer {
  const server = new HapiServer();

  server.connection({
    port,
    routes: {
      cors: true
    }
  });

  // TODO add debug logging for each route registered
  const combinedBaseURL: string = `${baseURL || ""}${BASE_PREFIX}`;
  const prefixedRoutes: RouteConfiguration[] = routes.map(x => ({
    ...x,
    path: combinedBaseURL + x.path
  }));

  prefixedRoutes.forEach(x => server.route(x));

  return server;
}
