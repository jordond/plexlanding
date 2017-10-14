import { merge } from "lodash";
import { resolve } from "path";

import { Config, defaults, user } from "./";
import {
  DEFAULT_ENV,
  defaultConfig as getDefaults,
  IServerConfig
} from "./defaults";
import * as environment from "./environments";
import { read, save } from "./user";

jest.mock("./user");
const mockRead = read as jest.Mock<any>;
const mockSave = save as jest.Mock<any>;

const STUB_READ_CONFIG_RESULT = { title: "test" };

describe("Merged Defaults", () => {
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

const STUB_TEST_CONFIG_PROD = buildTestConfig(environment.ENVIRONMENT_PROD);
const STUB_TEST_CONFIG_DEV = buildTestConfig(DEFAULT_ENV);

describe("User config", () => {
  beforeEach(() => {
    mockRead.mockClear();
    mockRead.mockReturnValue(Promise.resolve(STUB_READ_CONFIG_RESULT));
  });

  it("should merge user and defaults", async () => {
    await expect(user(environment.ENVIRONMENT_PROD)).resolves.toEqual(
      STUB_TEST_CONFIG_PROD
    );
    expect(mockRead).toHaveBeenCalled();
  });

  it("should use default environment", async () => {
    await expect(user(undefined, true)).resolves.toEqual(STUB_TEST_CONFIG_DEV);
  });

  it("should not use the cached config", async () => {
    await user(environment.ENVIRONMENT_PROD);
    expect(mockRead).not.toHaveBeenCalled();
  });

  it("should use cached config", async () => {
    expect(mockRead).not.toHaveBeenCalled();
    await user(environment.ENVIRONMENT_PROD, true);
    expect(mockRead).toHaveBeenCalled();
  });
});

const CONFIG_PATH: string = resolve(defaults()!.paths!.data, "config.json");

describe("Config Factory", () => {
  const configs = Config(environment.ENVIRONMENT_PROD);

  beforeEach(() => {
    mockRead.mockClear();
    mockRead.mockReturnValue(Promise.resolve(STUB_READ_CONFIG_RESULT));
    mockSave.mockClear();
  });

  it("should create a config object", () => {
    expect(configs).toEqual(
      expect.objectContaining({
        save: expect.any(Function),
        get: expect.any(Function),
        all: expect.any(Function)
      })
    );
  });

  it("should save", async () => {
    mockSave.mockReturnValue(Promise.resolve(true));
    const didSave = await configs.save(STUB_READ_CONFIG_RESULT);
    expect(mockSave).toBeCalledWith(CONFIG_PATH, STUB_READ_CONFIG_RESULT);
    expect(didSave).toBe(true);
  });

  it("should get all config", async () => {
    await expect(configs.get()).resolves.toEqual(STUB_TEST_CONFIG_PROD);
    expect(mockRead).not.toBeCalledWith(CONFIG_PATH);
  });

  it("should ignore the cache", async () => {
    await expect(configs.get(true)).resolves.toEqual(STUB_TEST_CONFIG_PROD);
    expect(mockRead).toBeCalledWith(CONFIG_PATH);
  });

  it("should provide a cached config", () => {
    expect(configs.all()).toEqual(STUB_TEST_CONFIG_PROD);
  });

  it("should use default environment", async () => {
    const defSpy = jest.spyOn(require("./defaults"), "defaultConfig");
    defSpy.mockReturnValueOnce({ env: environment.ENVIRONMENT_DEV });

    let devFactory = Config();
    await expect(devFactory.get(true)).resolves.toEqual(STUB_TEST_CONFIG_DEV);

    defSpy.mockReturnValueOnce({});
    devFactory = Config();
    await expect(devFactory.get(true)).resolves.toEqual(STUB_TEST_CONFIG_DEV);

    defSpy.mockRestore();
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

function buildTestConfig(env: string) {
  return merge({}, defaults(env), STUB_READ_CONFIG_RESULT);
}
