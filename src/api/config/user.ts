import { IOptions, readFile, writeFile } from "jsonfile";
import { merge } from "lodash";

import { IServerConfig } from "./defaults";

export function read(path: string, opts: object = {}): Promise<IServerConfig> {
  return new Promise(resolve => {
    readFile(path, opts, (err: any, obj: any) =>
      resolve((obj as IServerConfig) || {})
    );
  });
}

export function save(
  path: string,
  config: IServerConfig,
  { spaces = 2, ...opts }: IOptions = {}
): Promise<boolean> {
  return new Promise<boolean>(async (resolve, reject) => {
    if (!path) {
      return reject(new Error("No valid path was supplied"));
    }
    const savedConfig: IServerConfig = await read(path);
    const merged: IServerConfig = merge({}, savedConfig, config);
    writeFile(
      path,
      merged,
      { ...opts, spaces },
      (err: any) => (err ? reject(err) : resolve(true))
    );
  });
}
