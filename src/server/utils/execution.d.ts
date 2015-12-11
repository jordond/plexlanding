declare module Timing {
  const DEFAULT_PERCISION: number;

  interface IUptime {
    startDate: number;
    endDate: number;
    perciseElapsed: number[];
  }

  class ExecutionTimer {
    private _start: number[];
    private _startDate: number;
    private _percision: number;

    constructor(percision?: number);

    percision(percision: number): void;
    reset(): void;

    getElapsed(): number[];

    uptime(): IUptime;
    toString(percise?: boolean): string;
  }

  class Uptime {
    private _startDate: any;
    private _timer: ExecutionTimer;
    constructor();
    Start(): any;
    Timer(): ExecutionTimer;
    raw(): IUptime;
    prettyDate(date: number): string;
    toString(): string;
  }
}