import { $ } from "bun";
import { folderName } from "./modules/extract";

const [_bun, _program, ...positionals] = Bun.argv;
const repository = positionals.at(-1);

if (repository === undefined) {
  process.exit();
}

await $`git clone ${positionals}`.then((x) => {
  if (x.exitCode === 0) {
    return $`code ${folderName(repository)}`;
  }
});
