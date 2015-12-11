/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./utils/logger/logger.d.ts" />
/// <reference path="./utils/execution.d.ts" />

declare module Config {
  interface IPaths {
    root: string;
    client: string;
    server: string;
    dataDir?: string;
    webDir?: string;
  }

  interface ISecrets {
    session: string;
  }

  interface IApi {
    root?: string;
    secure?: boolean;
  }

  interface IEnvironment {
    valid?: string[];
    default?: string;
    environment?: string;
  }

  interface ISocket {
    path?: string;
    serveClient?: boolean;
  }

  interface IDatabase {
    name?: string;
    username?: string;
    password?: string;
    filename?: string;
    devMode?: boolean;
  }

  interface IConfig {
    env?: IEnvironment;
    paths?: IPaths;
    port?: number;
    log?: Logger.IConfig;
    secrets?: ISecrets;
    api?: IApi;
    socket?: ISocket;
    database?: IDatabase;
    debug?: boolean;
  }
}

declare module Core {
  interface Component {
    init(app: any, config: Config.IConfig): Promise<void> | Promise<{}>;
  }

  module Database {
    class Database {
      private _log: Logger.Console;
      private _config: Config.IConfig;
      private _timer: Timing.ExecutionTimer;

      constructor(config: Config.IConfig);

      init(app: any): Promise<void> | Promise<{}>;
      finalize(): Promise<void> | Promise<{}>;
      registerAssociates(): Promise<void> | Promise<{}>;
    }
  }
}

declare module Route {

  module Api {
    interface IEndpoint {
      name: string;
      routes?: any;
      model?: IModel;
    }

    interface IRoute {
      register: (router: any) => void;
    }

    interface IController {
      all?: (req: Express.Response, res: Express.Response) => void;
      show?: (req: Express.Response, res: Express.Response) => void;
      create?: (req: Express.Response, res: Express.Response) => void;
      update?: (req: Express.Response, res: Express.Response) => void;
      patch?: (req: Express.Response, res: Express.Response) => void;
      destroy?: (req: Express.Response, res: Express.Response) => void;
    }

    interface ISeedOptions {
      overwrite?: boolean;
      records: any[];
    }

    interface IClassMethods {
      associate?: (models: any) => void;
      [name: string]: any;
    }


    interface IModelMethods {
      classMethods?: IClassMethods;
      instanceMethods?: any;
    }

    interface IModel {
      name: string;
      schema: any;
      methods?: IModelMethods;
      seeds?: ISeedOptions;
    }

    interface ISocket {
      register: (socket: any) => void;
    }
  }

  interface IRouterError {
    name: string;
    err: any;
  }
}