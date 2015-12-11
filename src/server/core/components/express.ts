'use strict';

import { join } from 'path';
import { stat } from 'fs';
import { hostname } from 'os';

import * as express from 'express';
import * as favicon from 'serve-favicon';

let bluebird = require('bluebird');
let statAsync = bluebird.promisify(join);

let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let errorHandler = require('errorhandler');
let helmet = require('helmet');
let compression = require('compression');

import { create as Logger } from '../../utils/logger/index';
import { ExecutionTimer } from '../../utils/execution';

export default class Express implements Core.Component {
  private _log: Logger.Console;
  private _config: Config.IConfig;
  private _timer: ExecutionTimer;
  private _app: any;

  constructor(config: Config.IConfig) {
    this._log = Logger('Express');
    this._config = config;
  }

  init(app: any) {
    if (!app) {
      this._log.error('[init] App is not defined');
      throw 'App is not defined';
    }
    let env: string = app.get('env');
    this._timer = new ExecutionTimer();
    this._app = app;

    return this.setupServer(env).then(() => this._app);
  }

  start() {
    let _promise = (resolve: Function, reject: Function) => {
      this._log.info('Starting Express server on port [' + this._config.port + ']');
      let server = this._app.listen(this._config.port, () => {
        this._log.info('Server listening at [http://' + hostname() + ':' + this._config.port + ']');
        this._log.verbose('Web root [' + this._config.paths.client + ']');
        this._log.debug('Express instantionation took ' + this._timer.toString());
        resolve(server);
      });
    };

    return new Promise(_promise);
  }

  setupServer(env: string) {
    // Setup express middleware
    this._log.info('Setting up Express server instance in [' + env + '] mode');
    this._app.set('views', join(this._config.paths.server, 'views'));
    this._app.set('view engine', 'html');
    this._app.use(compression());
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(bodyParser.json());
    this._app.use(methodOverride());
    this._app.use(cookieParser());
    this._app.use(helmet());

    // Setup server paths
    this._app.use(express.static(join(this._config.paths.client)));
    this._app.set('clientPath', join(this._config.paths.client));

    // Environment specific options
    if (env === 'production') {
      this._log.debug('Setting morgan up in production mode, ignoring < 400');
      this._app.use(morgan('combined', {
        skip: (req: express.Request, res: express.Response) => res.statusCode < 400
      }));
      return this.setupFavicon(this._config.paths.client);
    } else {
      this._log.debug('Setting morgan up in dev mode, showing all');
      this._app.use(morgan('dev'));
      this._app.use(errorHandler());
      return Promise.resolve();
    }
  }

  setupFavicon(path: string) {
    this._log.debug('Checking if favicon exists');
    let faviconPath = join(path, 'favicon.ico');
    return statAsync(faviconPath).then((err: any) => {
      if (!err) {
        this._log.debug('Favicon exists and is being used');
        this._app.use(favicon(faviconPath));
      }
    });
  }
}