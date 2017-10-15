declare module "jsonfile" {
  export interface IOptions {
    path?: string;
    encoding?: string;
    fs?: IFSReplacement;
    spaces?: number;
    EOL?: string;
  }

  export interface IFSReplacement {
    readFile: (
      file: string,
      options?: object,
      cb?: (err: object, data: object) => void
    ) => void;
    writeFile: (
      file: string,
      data: string,
      options?: object,
      cb?: (err: object, data: object) => void
    ) => void;
  }

  /* tslint:disable-next-line:function-name */
  export function __setReadResult(result: object): void;

  export function readFile(
    file: string,
    callback: (err: object, data: object) => void
  ): void;

  export function readFile(
    file: string,
    options: string | IOptions,
    callback: (err: object, data: object) => void
  ): void;

  export function writeFile(
    file: string,
    data: object,
    callback: (err: object) => void
  ): void;

  export function writeFile(
    file: string,
    data: object,
    options: IOptions,
    callback: (err: object) => void
  ): void;
}
