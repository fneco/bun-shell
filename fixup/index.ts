import { $ } from "bun";
import { parseArgs } from "util";

const noStagedChanges = async () => {
  return (await $`git diff --staged`.text()) === "";
};

const { positionals, values } = parseArgs({
  strict: true,
  allowPositionals: true,
  options: {
    rebase: {
      type: "boolean",
    },
  },
});

if (await noStagedChanges()) {
  console.log("no staged changes");
  process.exit(1);
}

if (positionals.length === 0) {
  await $`git commit --amend --no-edit`;
  process.exit(0);
}

if (positionals.length === 1) {
  if (values.rebase === true) {
    await $`git rebase -i --autosquash ${positionals[0]}^`;
  }

  await $`git commit --fixup ${positionals[0]}`;
  process.exit(0);
}

console.log("unexpected args");
process.exit(1);
