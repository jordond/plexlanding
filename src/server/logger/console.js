import chalk from 'chalk';

import Base from './base';
import { log as logToFile } from './file';

function createChalkObject(level, message = level) {
  return { level, message };
}

export default class Console extends Base {
  constructor(tag, options = {}) {
    super(tag, options);
  }

  toConsole(item, colors, force = false) {
    if (this.shouldLog(item.level) || force) {
      const header = this.formatHeader(item.level, this.tag);
      const newLine = (item.data !== null && typeof item.data === 'object') ? '\n' : '';
      item.data = item.data || '';
      if (colors === null) {
        console.log(`${chalk.gray(this.timestamp())}${header} ${item.message}${newLine}`, item.data);
      } else {
        const timestamp = chalk.gray(this.timestamp());
        const chalkHeader = colors.level(header);
        const chalkMessage = colors.message(` ${item.message}`) + newLine;
        console.log(`${timestamp}${chalkHeader}${chalkMessage}`, item.data);
      }
      logToFile(this.tag, item);
    }
    return this;
  }

  out(message, data = {}, force = true) {
    const item = { level: 'LOG', message, data };
    return this.toConsole(item, null, force);
  }

  /**
   * When something has gone wrong
   * Always pass 'true' to {this.toConsole}, so that it is always outputted
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  error(message, data) {
    const colors = createChalkObject(chalk.bold.bgRed, chalk.bold.red);
    return this.toConsole({ level: 'ERROR', message, data }, colors, true);
  }

  /**
   * Something is not acceptable, but not desired
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  warning(message, data) {
    const colors = createChalkObject(chalk.bold.bgYellow, chalk.bold.yellow);
    return this.toConsole({ level: 'WARN', message, data }, colors);
  }

  /**
   * Not necessary information, but still nice to see
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  info(message, data) {
    const colors = createChalkObject(chalk.cyan);
    return this.toConsole({ level: 'INFO', message, data }, colors);
  }

  /**
   * Extra information
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  verbose(message, data) {
    const colors = createChalkObject(chalk.magenta);
    return this.toConsole({ level: 'VERBOSE', message, data }, colors);
  }

  /**
   * Debug level information
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  debug(message, data) {
    const colors = createChalkObject(chalk.gray);
    return this.toConsole({ level: 'DEBUG', message, data }, colors);
  }

  /**
   * All silly things to be outputted
   * @param {string}  message Content to output
   * @param {any}     data    Extra info to pass to console
   */
  silly(message, data) {
    const colors = createChalkObject(chalk.pink);
    return this.toConsole({ level: 'SILLY', message, data }, colors);
  }
}
