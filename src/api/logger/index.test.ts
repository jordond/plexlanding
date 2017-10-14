import * as jsonfile from "jsonfile";

import { create, createExceptionLogger } from "./";

jest.mock("winston");

describe("Create Logger", () => {
  const spyRead = jest.spyOn(jsonfile, "readFile");

  beforeAll(() => {
    spyRead.mockImplementation((a, b, c) => c(null, {}));
  });

  afterEach(() => {
    spyRead.mockClear();
  });

  it("should create a logger", async () => {
    const logger = await create("Test", false, true);
    expect(spyRead).toBeCalled();
    expect(logger).toEqual(expect.objectContaining({ label: "Test" }));
  });

  it("should create a default logger", async () => {
    const logger = await create();
    expect(logger).toEqual(
      expect.objectContaining({
        label: "App",
        handleExceptions: false
      })
    );
  });

  it("should create an exception logger", async () => {
    const logger = await createExceptionLogger();
    expect(spyRead).not.toBeCalled();
    expect(logger).toEqual(
      expect.objectContaining({ label: "System", handleExceptions: true })
    );
  });
});
