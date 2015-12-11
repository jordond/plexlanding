'use strict';

import * as winston from 'winston';

const MEGABYTE = 1000 * 1000;

let _wasInit = false;
let _winstonInstance = winston;

export function init(config: Logger.IConfig) {
  let winstonOptions = {
    level: config.level.toLowerCase(),
    filename:config.filename,
    maxsize: 50 * MEGABYTE,
    maxFiles: 3
  };
  _winstonInstance.add(winston.transports.File, winstonOptions);
  _winstonInstance.remove(winston.transports.Console);
  _wasInit = true;

  return Promise.resolve();
}

/**
 * Log the item to the specified log file
 * @param {ILogItem} item Contains level, message, and data
 * @returns {boolean} Whether or not it was logged
 */
export function log(item: Logger.ILogItem): boolean {
  if (_wasInit) {
    _winstonInstance.log(item.level.toLowerCase(), item.message, item.data);
  }
  return _wasInit;
}