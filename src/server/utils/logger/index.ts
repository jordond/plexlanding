/// <reference path="./logger.d.ts" />
'use strict';

import * as path from 'path';
import * as mkdirp from 'mkdirp';

import { init as initWinston } from './file';
import Console from './console';

let _loggerConfig: Logger.IConfig;

/**
 * Initialize the logger with configuration
 * @param {Logger.IConfig} config Logger specific configuration
 */
export function init(config: Config.IConfig) {
  let conf: Logger.IConfig = config.log;
  let log = new Console('Logger', conf );
  log.debug('Logger config: ', conf);

  let logDir = path.join(config.paths.dataDir, './logs');
  conf.filename = path.resolve(path.join(logDir, conf.filename || 'logger.log'));
  mkdirp.sync(logDir);

  conf.default = Console.validLevel(conf.default) ? conf.default.toUpperCase() : 'INFO';

  let isValidLevel = Console.validLevel(conf.level);
  if (!isValidLevel) {
    log.warning('Invalid log level [' + conf.level.toUpperCase() + '] defaulting to [' + conf.default + ']');
  }
  conf.level = isValidLevel ? conf.level.toUpperCase() : conf.default;

  _loggerConfig = conf;
  initWinston(conf).then(() => {
    log.info('Initialized logger with level of [' + conf.level + ']')
       .info('Using [' + conf.filename + ']');
  });


  return Promise.resolve(config);
}

/**
 * Create a new logger instance, with global options
 * or user supplied options
 * @param {string}  tag Tag for the console
 * @param {IConfig} config  (optional) Configuartion for the logger
 * @return Console logger object
 */
export function create(tag: string, config?: Logger.IConfig): Logger.Console {
  return new Console(tag, config || _loggerConfig);
}