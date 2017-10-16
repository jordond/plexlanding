import { Logger } from "winston";

import { createLogger, DEFAULT_FILEPATH } from "./logger";

jest.mock("winston");
const mockLogger = Logger as jest.Mock<any>;

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

  it("should throw error and create blank logger", () => {
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementationOnce(jest.fn());
    const logger = createLogger(undefined, "ShouldThrow");

    expect(consoleSpy).toBeCalled();
    expect(logger).toEqual({});

    consoleSpy.mockRestore();
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
