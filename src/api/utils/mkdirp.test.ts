import * as mkdirp from "mkdirp-promise";

import { ensureDirectoryExists } from "./mkdirp";

jest.mock("mkdirp-promise");
const mockMkdirp = mkdirp as jest.Mock<any>;
const STUB_FAKE_PATH = "/i/am/a/fake/path";

describe("Filesystem Utils", () => {
  afterEach(() => {
    mockMkdirp.mockReset();
  });

  it("should return a promise", async () => {
    await expect(ensureDirectoryExists("")).toBeInstanceOf(Promise);
    expect(mockMkdirp).toHaveBeenCalledTimes(0);
  });

  it("should return false if no path passed in", async () => {
    await expect(ensureDirectoryExists("")).resolves.toEqual(false);
    expect(mockMkdirp).toHaveBeenCalledTimes(0);
  });

  it("should return true if mkdirp is successful", async () => {
    mockMkdirp.mockReturnValueOnce(Promise.resolve(true));
    await expect(ensureDirectoryExists(STUB_FAKE_PATH)).resolves.toEqual(true);
    expect(mockMkdirp).toBeCalled();
  });

  it("should return false if mkdirp throws an error", async () => {
    mockMkdirp.mockReturnValueOnce(Promise.reject(new Error("Failed")));
    await expect(ensureDirectoryExists(STUB_FAKE_PATH)).resolves.toEqual(false);
    expect(mockMkdirp).toBeCalled();
  });

  it("should use the options if supplied", async () => {
    const options = { test: 123 };
    await ensureDirectoryExists(STUB_FAKE_PATH, options);
    expect(mockMkdirp).toBeCalledWith(STUB_FAKE_PATH, options);
  });
});
