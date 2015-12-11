'use strict';

import * as _express from 'express';
const express = (_express as any).default;

import { create } from '../utils/logger/index';
import Database from './components/database';
import Routes from './components/routes';
import Express from './components/express';
import Sockets from './components/sockets';

/**
 * Main server bootstrapper
 * Houses the server app instance and configuration
 * Will initialize all the components of the server
 */
export default class App {
  _app: _express.Application;
  _config: Config.IConfig;

  /**
   * Create a new app object
   * @param {Config.IConfig}  config  Main configuartion file which contains all of the application configuartion
   */
  constructor(config: Config.IConfig) {
    this._config = config;
    this._app = express();
  }

  /**
   * Initialize all the different components of the server
   * House all the promises in {componentPromises} and when
   * all of the promises have been resolved, then resolve the
   * final promise to inform of server initialization.
   * @return {Promise<void>}  Thenable promise
   */
  init() {
    let log = create('App');
    this._app.set('env', getEnvironment(this._config.env));

    // Create the boostrap promise
    let _promise = (resolve: Function, reject: Function) => {
      let database = new Database(this._config);
      let routes = new Routes(this._config);
      let server = new Express(this._config);
      let sockets = new Sockets(this._config);

      // Initialize app components and store promises
      this._app.get('test');
      database.init(this._app)
        .then((app) => server.init(app))
        .then((app) => routes.init(app))
        .then(() => server.start())
        .then((server) => sockets.init(server))
        .then(() => database.finalize())
        .then(() => {
          log.info('Server bootstrapping has been completed');
          resolve();
        })
        .catch((err) => reject(err));
    };

    return new Promise(_promise);
  }
}

/**
 * Get the application environment, then check to make sure it is
 * a valid environment.  If not assign the default development env
 * @param {Config.IEnvironment} config  Enviroment configuation object
 * @return {string} Applications environment
 */
function getEnvironment(config: Config.IEnvironment): string {
  let env = config.environment || process.env.NODE_ENV;
  return config.valid.indexOf(env) !== -1 ? env : config.default;
}