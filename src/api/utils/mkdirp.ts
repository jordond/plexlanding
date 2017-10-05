import * as mkdirp from "mkdirp-promise";

export async function ensureDirectoryExists(
  directory: string,
  options?: object
): Promise<boolean> {
  try {
    if (!directory) {
      return false;
    }
    const result = await mkdirp(directory, options);
    return Boolean(result);
  } catch (error) {
    return false;
  }
}
