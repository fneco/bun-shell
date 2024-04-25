import { $ } from "bun";
import clipboard from "clipboardy";
import { access, constants } from "node:fs";
import { join } from "path";
import { parseArgs } from "util";
import type { Config } from "./type";

// @ts-expect-error
const clipboardListener = (await import("clipboard-event")).default;

try {
  clipboardListener.startListening();
} catch (e) {
  const path = join(__dirname, "node_modules/clipboard-event/platform");
  await $`chmod -R 755 ${path}`;
  console.log(`added executable permission to "${path}". retry it.`);
  process.exit();
}

const { positionals } = parseArgs({
  strict: true,
  allowPositionals: true,
});
const file = positionals[0];

access(file, constants.R_OK, (err) => {
  if (err !== null) {
    console.log(`config.ts is required.`);
    process.exit();
  }
});

const config = (await import(file)).config as Config;

clipboardListener.on("change", () => {
  const edited = config.onCopy(clipboard.readSync());
  clipboard.writeSync(edited);
});
