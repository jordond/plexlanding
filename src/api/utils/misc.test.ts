import { escapeRegexString } from "./misc";

describe("Regex util", () => {
  it("should escape a regex string", () => {
    expect(escapeRegexString("/this/is/test")).toBe("\\/this\\/is\\/test");
    expect(escapeRegexString("/this^/te$t")).toBe("\\/this\\^\\/te\\$t");
  });
});
