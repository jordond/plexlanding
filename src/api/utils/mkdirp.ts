import * as mkdirp from "mkdirp-promise";

export async function ensureDirectoryExists(
  directory: string,
  options?: object
): Promise<boolean> {
  try {
    return await Boolean(mkdirp(directory, options));
  } catch (error) {
    return false;
  }
}
