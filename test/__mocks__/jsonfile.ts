import { IServerConfig } from "../../src/api/config/defaults";

const jsonfile: any = jest.genMockFromModule("jsonfile");
let mockReadResult: IServerConfig = {};

/* tslint:disable-next-line:function-name */
export function __setReadResult(result: IServerConfig) {
  mockReadResult = result;
}

export function readFile(
  path: string,
  opts: object,
  callback: (err?: object, data?: any) => void
) {
  if (Object.keys(mockReadResult).length === 0) {
    callback(new Error("No config was found"), null);
  } else {
    callback(undefined, mockReadResult);
  }
}

jsonfile.__setReadResult = __setReadResult;
jsonfile.readFile = readFile;

export default jsonfile;
