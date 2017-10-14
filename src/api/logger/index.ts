import { LoggerInstance } from "winston";

import { Config } from "../config";
import { createLogger } from "./logger";

export async function create(
  label?: string,
  handleExceptions: boolean = false,
  forceReadConfig: boolean = false
): Promise<LoggerInstance> {
  const config = (await Config().get(forceReadConfig)).log;
  return createLogger(config, label, handleExceptions);
}

export async function createExceptionLogger(): Promise<LoggerInstance> {
  return create("System", true);
}
