'use strict';

import * as _moment from 'moment';
const moment = (_moment as any).default;

/**
 * Available logging levels
 */
const LOG_LEVELS = ['ERROR', 'WARN', 'INFO', 'VERBOSE', 'DEBUG', 'SILLY'];

/**
 * Logger.Base
 * Base class to handle all the setup required for the logger class
 * Including setting the tag name, and handling the settings and log levels
 */
export default class Base {

  private _tag: string;
  private _levelsMaxLength: number;
  private _options: Logger.IConfig = {};
  private _levels: string[];

  constructor(tag: string, options?: Logger.IConfig) {
    options = options || {};

    this._tag = tag;
    this._options.default = Base.validLevel(options.default) ? options.default : 'INFO';
    this._options.level = Base.validLevel(options.level) ? options.level : this._options.default;
    this._options.short = options.short || false;
    this._levels = LOG_LEVELS;

    this._levelsMaxLength = levelsLength(LOG_LEVELS).length;
  }

  /**
   * Get logger tag
   * @returns {string} tag for the logger object
   */
  get tag() {
    return this._tag;
  }

  /**
   * Set a new logger tag
   * @params {string} newTag  new tag for logger
   */
  set tag(newTag: string) {
    this._tag = newTag;
  }

  /**
   * Determines whether or not the logger should log the message,
   * depending by the current log level set by the constructor
   * @param {string} outLevel The level of the console item
   * @return {boolean} whether or not to output
   */
  shouldLog(outLevel: string): boolean {
    outLevel = outLevel.trim().toUpperCase();
    let level: string = this._options.level.toUpperCase();
    let levelIdx: number = this._levels.indexOf(level);
    let outIdx: number = this._levels.indexOf(outLevel);
    if (levelIdx >= outIdx && levelIdx !== -1) {
      return true;
    } else if (levelIdx === -1) {
      return outIdx <= this._levels.indexOf(this._options.default.toUpperCase());
    }
    return false;
  }

  /**
   * Format the header(level) of the log entry
   * @param {String}  level The output level
   * @param {String}  tag   caller of the log
   * @returns {String}  formatted header
   */
  formatHeader(level: string, tag: string): string {
    if (this._options.short) {
      level = level.charAt(0).toUpperCase();
    } else if (this._levelsMaxLength > level.length) {
      var diff = this._levelsMaxLength - level.length;
      level = level.toUpperCase() + ' '.repeat(diff);
    } else {
      level = level.toUpperCase().slice(0, this._levelsMaxLength);
    }
    return '[' + level + '][' + tag + ']';
  }

  /**
  * Implement the ILogItem interface
  * @param {string}  level desired output level
  * @param {string}  message contents of log item
  * @param {Object}  data (optional) additional data to output to console
  * @returns {ILogItem} container holding level, message and data
  */
  createLogItem(level: string, message: string, data?: any): Logger.ILogItem {
    return {
      level: level,
      message: message,
      data: data || ''
    };
  }

  /**
   * Get a nicely formated timestamp using moment()
   * @param {string}  pattern (optional) Date format to use
   * @return {string} A Formatted date timestamp
   */
  timestamp(pattern?: string): string {
    return '[' + moment().format(pattern || 'YY/DD/MM|HH:mm:ss') + ']';
  }

  /**
   * Check whether or not the desired level is valid
   * @param {string}  desired Log level to be validated
   * @return {boolean}  Whether or not level is valid
   */
  static validLevel(desired: string): boolean {
    return LOG_LEVELS.indexOf(desired.toUpperCase()) !== -1;
  }

} // End of Base

/**
 * Get the longest level in the array of levels
 * @param {string[]} a array to calculate
 * @returns {string} longest element
 */
function levelsLength(a: string[]): string {
  var c = 0, d = 0, l = 0, i = a.length;
  if (i) {
    while (i--) {
      d = a[i].length;
      if (d > c) {
        l = i; c = d;
      }
    }
  }
  return a[l];
}