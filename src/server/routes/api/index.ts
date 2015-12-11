'use strict';

import * as express from 'express';

import { create } from '../../utils/logger/index';
import { database as getDatabase } from '../../core/components/database';
import { addModelSocket } from '../../core/components/sockets';
import endpoints from './endpoints';

let _log: Logger.Console;
let _database: any;

/**
 * A Class to handle all of the API specific routing for the
 * application.
 */
export default class Api {
  private _router: express.Router;
  private _pomises: any[];
  private _path: string;

  /**
   * Create a new api object
   */
  constructor(path?: string) {
    this._router = express.Router();
    this._pomises = [];
    this._path = path;
    _log = create('Api');
  }

  get router() {
    return this._router;
  }

  /**
   * Register all of the api endpoints
   * @returns {Promise} Resolves if all endpoints registered
   */
  register(app: express.Application) {
    let currentEndpoint = 'Unknown';
    _log.info('Attempting to register [' + endpoints.length + '] endpoints');
    try {
      let database = getDatabase();
      // Register all the endpoints
      for (let endpoint of endpoints) {
        let model = endpoint.model;
        let routes = new endpoint.routes();
        currentEndpoint = endpoint.name;

        // Register endpoint model
        if (model.schema) {
          database.register(model);
          _log.debug('Registered [' + model.name + ']\'s model');
        } else {
          _log.error('Could not register [' + model.name + ']\'s model');
          throw { message: 'Model error', data: model };
        }

        // Add model name to socket list
        addModelSocket(model.name);

        // Register endpoint routes
        let p = routes.register(this._router);
        _log.debug('Registered [' + endpoint.name + ']\'s routes')
            .verbose('Registered endpoint [' + currentEndpoint + ']');
        this._pomises.push(p);
      }
    } catch (error) {
      throw { err: error, stack: error.stack };
    }

    /**
     * When all endpoints have been registered
     * register some misc api routes
     * @returns {Express.Router} Loaded register object
     */
    let finished = () => {
      this._router.route('/').all(apiBaseHandler);
      this._router.route('/*').all(invalidApiHandler);
      app.use(this._path, this._router);
      _log.info('Finished registering all endpoints');
      return 'Api';
    };

    return Promise
      .all(this._pomises)
      .then(finished)
      .catch((err) => { throw { name: 'Api', err: err }; });
  }
}

/**
 * Handle all of the api endpoints that don't match what we have
 * defined.
 * @param {Request}  req  Express request object
 * @param {Response} res  Express response object
 * @returns {Response} Json containing invalid route message
 */
function invalidApiHandler(req: express.Request, res: express.Response) {
  return res.status(404).json('Invalid api route');
}

function apiBaseHandler(req: express.Request, res: express.Response) {
  return res.status(200).json('You\'ve reached the API');
}