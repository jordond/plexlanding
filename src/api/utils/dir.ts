import { ensureDir, ensureFile } from "fs-extra";

export async function ensureDirExists(directory: string): Promise<boolean> {
  return ensureHelper(ensureDir, directory);
}

export async function ensureFileExists(filepath: string): Promise<boolean> {
  return ensureHelper(ensureFile, filepath);
}

async function ensureHelper(
  func: ((a: string) => any),
  arg: string
): Promise<boolean> {
  try {
    if (!func || !arg) {
      return false;
    }
    const result = await func(arg);
    return Boolean(result);
  } catch (error) {
    return false;
  }
}
