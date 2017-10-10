import { __setReadResult, readFile, writeFile } from "jsonfile";
import { IServerConfig } from "./defaults";
import { read, save } from "./user";

jest.mock("jsonfile");

const STUB_CONFIG_PATH: string = "/path/to/file.json";
const STUB_READ_OPTIONS: object = { im: "fake" };
const STUB_SAVE_CONFIG: IServerConfig = {
  title: "Testing",
  port: 7777
};

const mockReadFile = readFile as jest.Mock<any>;
const mockWriteFile = writeFile as jest.Mock<any>;

describe("User config", () => {
  describe("Read", () => {
    beforeEach(() => {
      __setReadResult({ env: "development" });
    });

    afterEach(() => {
      mockReadFile.mockClear();
    });

    it("should return a promise", () => {
      expect(read("")).toBeInstanceOf(Promise);
      expect(mockReadFile).toBeCalled();
    });

    it("should return development env", async () => {
      const result: IServerConfig = await read(STUB_CONFIG_PATH);
      expect(result.env).toBe("development");
    });

    it("should return an empty object", async () => {
      __setReadResult({});
      await expect(read(STUB_CONFIG_PATH)).resolves.toEqual({});
    });

    it("should use supplied path", async () => {
      await read(STUB_CONFIG_PATH);
      expect(mockReadFile.mock.calls[0][0]).toEqual(STUB_CONFIG_PATH);
    });

    it("should use supplied path and options", async () => {
      await read(STUB_CONFIG_PATH, STUB_READ_OPTIONS);
      expect(mockReadFile.mock.calls[0][0]).toEqual(STUB_CONFIG_PATH);
      expect(mockReadFile.mock.calls[0][1]).toEqual(STUB_READ_OPTIONS);
    });
  });

  describe("Save", () => {
    afterEach(() => {
      mockWriteFile.mockClear();
    });

    it("should return a promise", async () => {
      const promise = save(STUB_CONFIG_PATH, STUB_SAVE_CONFIG);
      expect(promise).toBeInstanceOf(Promise);

      await promise;
      expect(mockWriteFile).toBeCalled();
    });

    it("should throw an invalid path error", async () => {
      await expect(save("", {})).rejects.toBeInstanceOf(Error);
      expect(mockWriteFile).not.toBeCalled();
    });

    it('should use supplied "spaces" argument', async () => {
      await save(STUB_CONFIG_PATH, {}, { spaces: 4 });
      expect(mockWriteFile.mock.calls[0][2]).toEqual({ spaces: 4 });
    });

    it("should save the existing config with the new", async () => {
      mockReadFile.mockImplementationOnce((a, b, cb) =>
        cb(null, { title: "bar", port: 8888, baseURL: "/foo" })
      );

      expect(await save(STUB_CONFIG_PATH, { title: "foo", port: 9999 })).toBe(
        true
      );
      expect(mockWriteFile.mock.calls[0][1]).toEqual({
        title: "foo",
        port: 9999,
        baseURL: "/foo"
      });
    });

    it("should handle a failed save", async () => {
      mockWriteFile.mockImplementationOnce((a, b, c, cb) =>
        cb(new Error("foo"))
      );
      await expect(save(STUB_CONFIG_PATH, {})).rejects.toBeInstanceOf(Error);
    });
  });
});
