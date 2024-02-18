import { $ } from "bun";
import { parseArgs } from "util";
import { folderName } from "./modules/extract";

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
});

const firstArg = positionals[2];

await $`git clone ${firstArg}`.then((x) => {
  if (x.exitCode === 0) {
    return $`code ${folderName(firstArg)}`;
  }
});
