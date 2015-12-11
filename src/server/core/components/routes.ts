'use strict';

import * as express from 'express';

import { create } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';
import Api from '../../routes/api/index';
import Statics from '../../routes/static/index';



export default class Routes implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;

  constructor(config: Config.IConfig) {
    this._log = create('Routes');
    this._config = config;
  }

  /**
   * Initialize the Router component
   * Load all api routes and then setup
   * the static and other routes
   * @param {Express.Application} app     Express server instance
   * @param {Express.Router}      router  Express router object
   * @returns {Promise} resolve when all routes are loaded
   */
  init(app: any) {
    if (!app) {
      this._log.error('[init] App is not defined');
      throw 'App is not defined';
    }

    let timer = new ExecutionTimer();
    let _router = express.Router();

    this._log.info('Registering [Api, Statics] components');

    let api = new Api(this._config.api.root);
    let statics = new Statics(this._config.paths.client);

    let chain = api.register(app)
      .then((name: string) => {
        this.onRegistered(name);
        return statics.register(app);
      })
      .then((name: string) => this.onRegistered(name))
      .catch((err) => this.registerErrorHandler(err));

    return chain
      .then(() => {
        this._log.info('Finished registering all route components');
        this._log.debug('Routes instantiation took ' + timer.toString());
        return app;
      });
  }

  /**
  * Called when an route has finished registering
  * @param {String}  name  Name of the route
  */
  private onRegistered(name: string) {
    // TODO handle this?
    this._log.verbose('Finished registering [' + name + ']');
  }

  /**
  * Handle any errors that happen when registering routes.
  * Log the error event name, then throw the error so that
  * the promise gets rejected
  * @param {Route.IRouterError} err  Contains all the error information
  * @throws {Object} Error object from exception
  */
  private registerErrorHandler(err: Route.IRouterError) {
    this._log.error('Error register route [' + err.name + ']', err);
    throw err;
  }
}

