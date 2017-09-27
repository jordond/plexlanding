import * as merge from "deep-extend";

import { defaults } from "./";
import { defaultConfig as getDefaults, IServerConfig } from "./defaults";
import * as environment from "./environments";

describe("Merging of configs", () => {
  const oldNodeEnv: NodeJS.ProcessEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...oldNodeEnv };
  });

  it("should merge defaults with dev config", () => {
    testMergedDefaults(environment.ENVIRONMENT_DEV);
  });

  it("should merge defaults with prod config", () => {
    testMergedDefaults(environment.ENVIRONMENT_PROD);
  });

  it("should merge defaults with test config", () => {
    testMergedDefaults(environment.ENVIRONMENT_TEST);
  });

  it("should have env === dev if invalid NODE_ENV is set", () => {
    testMergedDefaults("INVALID1");
  });

  it("should use environment passed in as an arg", () => {
    const expectedDefaults: IServerConfig = getMergedConfig(
      environment.ENVIRONMENT_PROD
    );
    expect(defaults(environment.ENVIRONMENT_PROD)).toEqual(expectedDefaults);
  });
});

function testMergedDefaults(env: string): void {
  process.env.NODE_ENV = env;
  const expectedDefaults: IServerConfig = getMergedConfig(env);
  expect(defaults()).toEqual(expectedDefaults);
}

function getMergedConfig(env: string): IServerConfig {
  return merge(environment.getEnvironmentConfig(env), getDefaults());
}
