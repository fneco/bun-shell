import { $ } from "bun";
import { join, resolve } from "node:path";
import { parseArgs } from "util";

const outputPath = process.env.OUTPUT_PATH ?? ".";

const { positionals } = parseArgs({
  strict: true,
  allowPositionals: true,
});
const path = positionals[0];
const targetFolder = resolve(path);
const targetFilepath = join(targetFolder, "index.ts");

const packageJson = await Bun.file(join(path, "package.json")).json();
const name = packageJson.name;

console.log({
  targetFilepath,
  outputPath,
});

await $`bun build ${targetFilepath} --compile --outfile ${name}`;
await $`sudo mv ${name} ${outputPath}`;
