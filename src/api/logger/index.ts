import { LoggerInstance } from "winston";

import { Config } from "../config";
import { createLogger } from "./logger";

export async function create(
  label: string,
  handleExceptions: boolean
): Promise<LoggerInstance> {
  const config = (await Config().get()).log;
  return createLogger(config, label, handleExceptions);
}

export async function createExceptionLogger(): Promise<LoggerInstance> {
  return create("System", true);
}
