import { watch } from "fs/promises";
import { startListening } from "./modules/clipboard-event";
import { importConfig } from "./modules/import-config";
import { parseArgs } from "./modules/parse-args";

const { absolutePathToConfig: path } = await parseArgs();

const config = await importConfig(path);

const { restart } = await startListening(config.onCopy);

if (config.watch ?? true) {
  const watcher = watch(path);
  for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    restart((await importConfig(path)).onCopy);
  }
}
