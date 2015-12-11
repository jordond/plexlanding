'use strict';

import * as _moment from 'moment';
const moment = (_moment as any).default;

/**
 * Default amount of decimal places for milliseconds
 */
const DEFAULT_PERCISION = 3;

/**
 * Container for the raw uptime information
 */
export interface IUptime {
  startDate: number;
  endDate: number;
  perciseElapsed: number[];
}

/**
 * Class to calculate the execution time of a block
 * of code.  Gets start time on `new` instance, or can
 * be reset with {this.reset()}.
 */
export class ExecutionTimer {
  private _start: number[];
  private _startDate: number;
  private _percision: number;

  /**
   * Start the timer and set output percision
   * @param {number}  percision (optional) Number of decimal places to output
   */
  constructor(percision?: number) {
    this._start = process.hrtime();
    this._startDate = Date.now();
    this._percision = percision || DEFAULT_PERCISION;
  }

  /**
   * Set a new percision
   * @param {number}  percision Number of decimal places to output
   */
  set percision(percision: number) {
    this._percision = percision;
  }

  /**
   * Reset the execution timer to test a new block of code
   */
  reset(): void {
    this._start = process.hrtime();
  }

  /**
   * Get the elapsed execution time
   * @returns {number[]} Array containing the seconds and milliseconds since start
   */
  getElapsed(): number[] {
    return process.hrtime(this._start);
  }

  uptime(): IUptime {
    return {
      startDate: this._startDate,
      endDate: Date.now(),
      perciseElapsed: this.getElapsed()
    };
  }

  /**
   * Get the elapsed execution time as a string of
   * seconds and milliseconds.
   * @param {boolean} percise True to not round off the decimal places
   * @returns {string} Formatted string of elapsed time
   */
  toString(percise?: boolean): string {
    let end = process.hrtime(this._start);
    let seconds = end[0];
    let milliseconds = end[1] / 1000000;

    let formatted = seconds + 's ';
    if (percise) {
      return formatted + milliseconds + 'ms';
    }
    return formatted + milliseconds.toFixed(this._percision) + 'ms';
  }
}

/**
 * Simple class to calculate and format uptime statistics
 */
export class Uptime {
  private _startDate: any;
  private _timer: ExecutionTimer;

  /**
   * Grab the start time, and instantiate a new timer object
   */
  constructor() {
    this._startDate = moment();
    this._timer = new ExecutionTimer();
  }

  /**
   * Grab the moment.js start date
   * @return {Object} Momentjs compatible start date
   */
  get Start() {
    return this._startDate;
  }

  /**
   * Get the ExecutionTimer instance
   * @return {ExecutionTimer} Timer instance
   */
  get Timer() {
    return this._timer;
  }

  /**
   * Grab the raw uptime data
   * @return {IUptime} Raw unformatted uptime information
   */
  raw(): IUptime {
    return {
      startDate: this._startDate,
      endDate: Date.now(),
      perciseElapsed: this._timer.getElapsed()
    };
  }

  /**
   * Pretty up the date
   * @return {String} Beautified momentjs date string
   */
  prettyDate(date: number): string {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  /**
   * Get a formatted string containing the difference between start and now
   * @return {String} Momentjs formatted difference string
   */
  toString(): string {
    return moment(this._startDate).fromNow();
  }
}