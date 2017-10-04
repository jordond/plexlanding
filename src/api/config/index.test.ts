import { merge } from "lodash";

import { defaults } from "./";
import { defaultConfig as getDefaults, IServerConfig } from "./defaults";
import * as environment from "./environments";

describe("Merging of configs", () => {
  const oldNodeEnv: NodeJS.ProcessEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...oldNodeEnv };
  });

  it("should merge defaults with dev config", () => {
    const mergedDefaults = testMergedDefaults(environment.ENVIRONMENT_DEV);
    expect(mergedDefaults.secureAPI).toBeFalsy();
  });

  it("should merge defaults with prod config", () => {
    const mergedDefaults = testMergedDefaults(environment.ENVIRONMENT_PROD);
    expect(mergedDefaults.secureAPI).toBeTruthy();
  });

  it("should merge defaults with test config", () => {
    const mergedDefaults = testMergedDefaults(environment.ENVIRONMENT_TEST);
    expect(mergedDefaults.secureAPI).toBeFalsy();
    expect(mergedDefaults.log).toBeTruthy();
    expect(mergedDefaults.log!.silent).toBeTruthy();
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

function testMergedDefaults(env: string): IServerConfig {
  process.env.NODE_ENV = env;
  const expectedDefaults: IServerConfig = getMergedConfig(env);
  const mergedConfig: IServerConfig = defaults(env);

  expect(mergedConfig).toEqual(expectedDefaults);
  return mergedConfig;
}

function getMergedConfig(env: string): IServerConfig {
  return merge({}, getDefaults(), environment.getEnvironmentConfig(env));
}
