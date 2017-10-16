import { ensureDir, ensureFile } from "fs-extra";

import { ensureDirExists } from "./dir";

jest.mock("fs-extra");
const mockEnsureDir = ensureDir as jest.Mock<any>;
const mockEnsureFile = ensureFile as jest.Mock<any>;

const STUB_FAKE_PATH = "/i/am/a/fake/path";

describe("Filesystem Utils", () => {
  describe("Directory", () => {
    afterEach(() => {
      mockEnsureDir.mockReset();
    });

    it("should return a promise", async () => {
      await expect(ensureDirExists("")).toBeInstanceOf(Promise);
      expect(mockEnsureDir).toHaveBeenCalledTimes(0);
    });

    it("should return false if no path passed in", async () => {
      await expect(ensureDirExists("")).resolves.toEqual(false);
      expect(mockEnsureDir).toHaveBeenCalledTimes(0);
    });

    it("should return true if mkdirp is successful", async () => {
      mockEnsureDir.mockReturnValueOnce(Promise.resolve(true));
      await expect(ensureDirExists(STUB_FAKE_PATH)).resolves.toEqual(true);
      expect(mockEnsureDir).toBeCalled();
    });

    it("should return false if mkdirp throws an error", async () => {
      mockEnsureDir.mockReturnValueOnce(Promise.reject(new Error("Failed")));
      await expect(ensureDirExists(STUB_FAKE_PATH)).resolves.toEqual(false);
      expect(mockEnsureDir).toBeCalled();
    });

    it("should use the options if supplied", async () => {
      await ensureDirExists(STUB_FAKE_PATH);
      expect(mockEnsureDir).toBeCalledWith(STUB_FAKE_PATH);
    });
  });

  describe("File", () => {
    afterEach(() => {
      mockEnsureDir.mockClear();
    });
  });
});
