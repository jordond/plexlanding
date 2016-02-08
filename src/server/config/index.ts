/**
 * Main server configuration Defaults
 * Entrypoint for all of the applications configuration.
 *
 * This contains the defaults, while the `environment` directory
 * contains the environment specific configuration.
 *
 * On init, user config is applied.
 */

'use strict';

import * as path from 'path';
import * as fs from 'fs';

import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import { argv as args } from 'yargs';

import prod from './environments/production';
import dev from './environments/development';
import defaults from './protected';
import plex from './plex';

let _config: Config.IConfig = {

  /**
   * Environment to run server in
   */
  env: {
    valid: ['production', 'development'],
    default: 'development',
    environment: <string>process.env.NODE_ENV
  },

  /**
   * Server paths for express
   */
  paths: {
    root: path.normalize(__dirname + '/..'),
    client: path.normalize(__dirname + '/../client'),
    server: path.normalize(__dirname + '/../server'),
    webDir: '/'
  },

  /**
   * Port for express to listen on
   */
  port: process.env.PORT || 9000,

  /**
   * Default logger options
   * types: console, file, json, none
   */
  log: {
    filename: 'server.log',
    level: <string> 'INFO',
    short: <boolean> false,
    default: <string> 'INFO'
  },

  /**
   * Application secrets, these defaults should be changed and not checked
   * into source control
   */
  secrets: {
    session: 'YouShOuldREAllyreplaceTHIs'
  },

  /**
   * Api configuration, including path and security
   * NOTE: secure is not implemented
   */
  api: {
    root: '/api',
    secure: false // Not implemented
  },

  /**
   * Socket.IO Configuration
   */
  socket: {
    serveClient: true
  },

  /**
   * SQLite database configuration
   */
  database: {
    name: 'data',
    username: 'admin',
    password: 'admin',
    filename: 'database.sqlite',
    devMode: false // Always recreate database
  }
};

/**
 * Initialize the configuration and gather all config options into
 * a single config object. Merge in the protected defaults after user
 * config has been loaded.
 * @param   {Object}  config      User config.json file
 * @param   {String}  environment Decide which environment configuration to use
 * @returns {Object}  Combined configuration file. (defaults, environment, user)
 */
export default function init(config: any, environment?: string): any {
  let _promise = function(resolve: Function, reject: Function) {
    let env = environment || config.env || _config.env;
    let environmentConfig = env === 'production' ? prod : dev;
    _config = _.merge(_config, environmentConfig || {}, plex || {}, config || {}, defaults);

    if (args.dataDir) {
      _config.paths.dataDir = args.dataDir;
    } else if (!_config.paths.dataDir || _config.paths.dataDir === '') {
      _config.paths.dataDir = path.join(_config.paths.root, './data');
    }

    // If actively developing keep the data dir in server dir so it gets
    // wiped after every file change
    if (_config.debug) {
      _config.paths.dataDir = path.join(_config.paths.server, './data');
    }

    let dir = path.resolve(_config.paths.dataDir);
    fs.stat(path.resolve(_config.paths.dataDir), (err: any) => {
      if (err) {
        mkdirp.sync(dir);
      }
      return resolve(_config);
    });
  };

  return new Promise(_promise);
}