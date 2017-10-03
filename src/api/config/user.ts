import * as merge from "deep-extend";
import { IOptions, readFile, writeFile } from "jsonfile";

import { defaults } from "./";
import { IServerConfig } from "./defaults";

const defaultDataDir: string = defaults().paths!.data || "";

export function read(
  path: string = defaultDataDir,
  opts: object = {}
): Promise<IServerConfig> {
  return new Promise(resolve => {
    readFile(path, opts, (err, obj) => resolve((obj as IServerConfig) || {}));
  });
}

export async function save(
  config: IServerConfig,
  opts: IOptions = {}
): Promise<boolean> {
  if (!opts.spaces) {
    opts.spaces = 2;
  }
  const savedConfig: IServerConfig = await read();
  const merged: IServerConfig = merge(config, savedConfig);
  return new Promise<boolean>((resolve, reject) => {
    writeFile(
      opts.path || defaultDataDir,
      merged,
      opts,
      err => (err ? reject(err) : resolve(true))
    );
  });
}
