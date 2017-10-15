import { Logger as mockLogger } from "winston";

import { createLogger, DEFAULT_FILEPATH } from "./logger";

jest.mock("winston");

describe("Logger Instance", () => {
  it("should use the default file path", () => {
    const defaultConfig = {
      handleExceptions: false,
      exitOnError: false,
      ...createFilePathMatcher(DEFAULT_FILEPATH)
    };
    createLogger();
    expect(mockLogger).toBeCalledWith(expect.objectContaining(defaultConfig));
  });

  it("should use a custom file path", () => {
    const filename: string = "./fake/path";
    createLogger({ filename });
    expect(mockLogger).toBeCalledWith(
      expect.objectContaining(createFilePathMatcher(filename))
    );
  });
});

function createFilePathMatcher(expectedPath: string): object {
  return {
    transports: expect.arrayContaining([
      expect.objectContaining({
        filename: expectedPath
      })
    ])
  };
}
