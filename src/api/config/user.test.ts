import { read } from "./user";

describe("User config", () => {
  it.skip("should read the config from the disk", () => {
    expect(read()).toBe({});
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
