import * as env from "./environments";

describe("Environment config defaults", () => {
  it("should return the development config", () => {
    expect(env.getEnvironmentConfig(env.ENVIRONMENT_DEV)).toEqual(
      env.devConfig
    );
  });

  it("should return the production config", () => {
    expect(env.getEnvironmentConfig(env.ENVIRONMENT_PROD)).toEqual(
      env.prodConfig
    );
  });

  it("should return the test config", () => {
    expect(env.getEnvironmentConfig(env.ENVIRONMENT_TEST)).toEqual(
      env.testConfig
    );
  });

  it("should return object with dev environment if invalid param is passed", () => {
    expect(env.getEnvironmentConfig("INVALID")).toEqual({
      env: env.ENVIRONMENT_DEV
    });
  });
});
