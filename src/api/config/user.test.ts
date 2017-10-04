jest.mock("jsonfile");

import { __setReadResult } from "jsonfile";
import { IServerConfig } from "./defaults";
import { read } from "./user";

describe("User config", () => {
  describe("Read", () => {
    beforeEach(() => {
      __setReadResult({ env: "development" });
    });

    it("should return a promise", () => {
      expect(read()).toBeInstanceOf(Promise);
    });

    it("should return development env", async () => {
      const result: IServerConfig = await read();
      expect(result.env).toBe("development");
    });

    it.skip("should read the config from the disk", () => {
      expect(read()).toBe({});
    });
  });

  it.skip("should save the config to the disk", async () => {
    // const saved: boolean = await save(
    //   { env: "test" },
    //   { path: "/path/to/something" }
    // );
    // expect(saved).toBeTruthy();
    // TODO mock the fs.write function, make sure the correct data is saved
  });
});
