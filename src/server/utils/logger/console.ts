'use strict';

// TODO temp fix until typescript issue is fixed
import * as _chalk from 'chalk';
const chalk = (_chalk as any).default;

import Base from './base';
import { log as logToFile } from './file';

/**
 * Logger.Console
 * Inherits from Logger.Base
 * Handles the outputting of information to the console
 */
export default class Console extends Base {
  constructor(tag: string, options?: Logger.IConfig) {
    super(tag, options);
  }

  /**
   * Do the heavy lifting and output the item to the console
   * @param {ILogItem}    item    Object containing console info
   * @param {IConsoleColors}  colors  output using chalk colors
   * @param {Boolean}         force (optional) always output to console
   */
  toConsole(item: Logger.ILogItem, colors?: Logger.IConsoleColors, force?: boolean): Console {
    if (this.shouldLog(item.level) || force) {
      let header: string = this.formatHeader(item.level, this.tag);
      let newLine = (item.data !== null && typeof item.data === 'object') ? '\n' : '';
      item.data = item.data || '';
      if (colors === null) {
        console.log(chalk.gray(this.timestamp()) + header + ' ' + item.message + newLine, item.data);
      } else {
        console.log(chalk.gray(this.timestamp())
          + colors.level(header)
          + colors.message(' ' + item.message) + newLine, item.data);
      }
      logToFile(item);
    }
    return this;
  }

  /**
   * Custom log level with option to force outputting if it is
   * not in the list of acceptable levels
   * @param {string}  message  message to output
   * @param {data}    data  (optional) extra data to output
   * @param {boolean} force (optional) force output, default true
   */
  public out(message: string, data?: any, force?: boolean): Console {
    if (typeof force === 'undefined') {
      force = true;
    }
    let item = { level: 'LOG', message: message, data: data };
    return this.toConsole(item, null, force);
  }

  /**
   * When something has gone wrong
   * Always pass 'true' to {this.toConsole}, so that it is always outputted
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  error(message: string, data?: any): Console {
    let colors = createColor(chalk.bold.bgRed, chalk.bold.red);
    return this.toConsole(this.createLogItem('ERROR', message, data), colors, true);
  }

  /**
   * Something is not acceptable, but not desired
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  warning(message: string, data?: any): Console {
    let colors = createColor(chalk.bold.bgYellow, chalk.bold.yellow);
    return this.toConsole(this.createLogItem('WARN', message, data), colors);
  }

  /**
   * Not necessary information, but still nice to see
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  info(message: string, data?: any): Console {
    let colors = createColor(chalk.cyan);
    return this.toConsole(this.createLogItem('INFO', message, data), colors);
  }

  /**
   * Extra information
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  verbose(message: string, data?: any): Console {
    let colors = createColor(chalk.magenta);
    return this.toConsole(this.createLogItem('VERBOSE', message, data), colors);
  }

  /**
   * Debug level information
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  debug(message: string, data?: any): Console {
    let colors = createColor(chalk.gray);
    return this.toConsole(this.createLogItem('DEBUG', message, data), colors);
  }

  /**
   * All silly things to be outputted
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  silly(message: string, data?: any): Console {
    let colors = createColor(chalk.pink);
    return this.toConsole(this.createLogItem('SILLY', message, data), colors);
  }

  // shouldLog(outLevel: string): boolean {
  //   return super.shouldLog(outLevel);
  // }

} // End of Logger.Console

/**
 * Implements the IConsoleColors interface
 * @param {Chalk.ChalkStyle}  level Chalk color object for level
 * @param {Chalk.ChalkStyle}  message (optional) color object for message
 * @returns {IConsoleColors}  container of color objects
 */
function createColor(level: any, message?: any): Logger.IConsoleColors {
  return {
    level: level,
    message: message || level
  };
}