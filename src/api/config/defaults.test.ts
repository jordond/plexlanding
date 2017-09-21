import { resolve } from "path";

import { DEFAULT_SERVER_PORT, defaultConfig } from "./defaults";
import { ENVIRONMENT_DEV, ENVIRONMENT_PROD } from "./environments";

describe("Default config", () => {
  const oldNodeEnv: NodeJS.ProcessEnv = { ...process.env };
  const oldDirname: string = __dirname;

  beforeEach(() => {
    process.env = { ...oldNodeEnv };
    __dirname = oldDirname;
  });

  it("should use the env from NODE_ENV", () => {
    checkEnv("NODE_ENV", ENVIRONMENT_PROD, "env", ENVIRONMENT_PROD);
  });

  it("should use a default env value if it doesn't exist in NODE_ENV", () => {
    checkEnv("NODE_ENV", "", "env", ENVIRONMENT_DEV);
  });

  it("should use the port from process.env", () => {
    checkEnv("PORT", "8888", "port", 8888);
  });

  it("should use the default port if env.port is not a number", () => {
    checkEnv("PORT", "I'm not a number", "port", DEFAULT_SERVER_PORT);
  });

  it("should use the default port if doesn't exist", () => {
    checkEnv("PORT", "", "port", DEFAULT_SERVER_PORT);
  });

  it("should have a default of false for docker flag", () => {
    checkEnv("IS_DOCKER", "", "isDocker", false);
  });

  it("should allow isDocker to be set by the env variable", () => {
    checkEnv("IS_DOCKER", "true", "isDocker", true);
  });

  it("should have a data dir relevent to the output folder", () => {
    process.env.DATA_DIR = "";

    const { root = "", data = "" } = defaultConfig().paths || {};
    expect(data).toEqual(resolve(root, "data"));
  });

  it("should have a data dir pulled from the environment variable", () => {
    const fakePath: string = "/i/am/a/fake/path";
    process.env.DATA_DIR = fakePath;

    const { data = "" } = defaultConfig().paths || {};
    expect(data).toEqual(resolve(fakePath, "data"));
  });
});

function checkEnv(
  envKey: string,
  envValue: string,
  expectedKey: string,
  expected: any
) {
  process.env[envKey] = envValue;

  const value = defaultConfig()[expectedKey];
  expect(value).toEqual(expected);
}
