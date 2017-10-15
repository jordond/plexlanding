import { resolve } from "path";

import { LoggerInstance } from "winston";

import { Config } from "../config";
import { createLogger } from "./logger";

export async function create(
  label?: string,
  handleExceptions: boolean = false,
  forceReadConfig: boolean = false
): Promise<LoggerInstance> {
  const config = await Config().get(forceReadConfig);
  return createLogger(
    {
      ...config.log,
      filename: resolve(config.paths!.data, config.log!.filename)
    },
    label,
    handleExceptions
  );
}

export async function createExceptionLogger(): Promise<LoggerInstance> {
  return create("System", true);
}
