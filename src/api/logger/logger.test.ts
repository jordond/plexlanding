import { resolve } from "path";
import { Logger as Test } from "winston";

import { createLogger, DEFAULT_FILEPATH, FILENAME } from "./logger";
import { ILogConfig } from "./logger.interface";

jest.mock("winston", () => {
  return {
    Logger: jest.fn((opts: any) => opts),
    transports: {
      Console: jest.fn(),
      File: jest.fn((o: ILogConfig) => o)
    }
  };
});

describe("Logger Instance", () => {
  const defaultConfig = {
    handleExceptions: false,
    exitOnError: false,
    transports: expect.arrayContaining([
      expect.objectContaining({
        filepath: resolve(DEFAULT_FILEPATH, FILENAME)
      })
    ])
  };

  it("should use the default file path", () => {
    createLogger();
    expect(Test).toBeCalledWith(expect.objectContaining(defaultConfig));
  });
});
