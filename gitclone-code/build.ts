import { $ } from "bun";

const name = "gitclone-code";
const outputPath = process.env.OUTPUT_PATH ?? ".";

console.log({
  name,
  outputPath,
});

await $`bun build ./index.ts --compile --outfile ${name}`;
await $`mv ${name} ${outputPath}`;
