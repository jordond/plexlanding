import { RouteConfiguration, Server, ServerConnectionOptions } from "hapi";

import { defaults } from "./config";
import { IServerConfig } from "./config/defaults";

import routes from "./endpoints";

export const BASE_PREFIX: string = "/api";

export function create(config: IServerConfig = defaults): Server {
  const port = config.port;
  const server = new Server();

  const serverConfig: ServerConnectionOptions = {
    port,
    routes: {
      cors: true
    }
  };

  server.connection(serverConfig);

  // TODO add debug logging for each route registered
  const baseURL: string =
    BASE_PREFIX + (Boolean(config.baseURL) ? config.baseURL : "");
  const prefixedRoutes: RouteConfiguration[] = routes.map(x => {
    x.path = baseURL + x.path;
    return x;
  });

  prefixedRoutes.forEach(x => server.route(x));

  return server;
}
