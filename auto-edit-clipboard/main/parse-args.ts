import { access, constants } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { parseArgs as parseArgsUtil } from "util";

const requiredFilename = "config.js";

export const parseArgs = async (): Promise<{
  absolutePathToConfig: string;
}> => {
  const { positionals } = parseArgsUtil({
    strict: true,
    allowPositionals: true,
  });
  const file = positionals[0] || `./${requiredFilename}`;

  return new Promise((resolve, reject) => {
    access(file, constants.R_OK, (err) => {
      if (err !== null) {
        console.log(`${requiredFilename} is required.`);
        reject(err);
      }
    });

    return resolve({ absolutePathToConfig: resolvePath(file) });
  });
};
