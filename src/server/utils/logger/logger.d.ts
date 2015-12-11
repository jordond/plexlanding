declare module Logger {

  interface IConfig {
    filename?: string;
    level?: string;
    short?: boolean;
    default?: string;
  }

  interface ILogItem {
    level: string;
    message: string;
    data: any;
  }

  export interface IConsoleColors {
    level: any;
    message: any;
  }

  class Base {
    _tag: string;
    _levelsMaxLength: number;
    _options: IConfig;

    constructor(tag: string, options?: IConfig);

    shouldLog(outLevel: string): boolean;
    formatHeader(level: string, tag: string): string;
    createLogItem(level: string, message: string, data?: any): ILogItem;
    timestamp(): string;
  }

  class Console {
    constructor(tag: string, options?: IConfig);

    toConsole(item: ILogItem, colors?: IConsoleColors, force?: boolean): Console;
    public out(message: string, data?: any, force?: boolean): Console;

    error(message: string, data?: any): Console;
    warning(message: string, data?: any): Console;
    info(message: string, data?: any): Console;
    verbose(message: string, data?: any): Console;
    debug(message: string, data?: any): Console;
    silly(message: string, data?: any): Console;
    shouldLog(level: string): boolean;
  }

  function init(config: IConfig): PromiseLike<any>;
  function create(tag: string, config?: IConfig): Console;

}