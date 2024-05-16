import { watch } from "fs/promises";
import { importConfig, parseArgs, startListening } from "./main";

const { absolutePathToConfig: path } = await parseArgs();

const getConfig = async () => importConfig(path);
const config = await getConfig();

const { restart } = await startListening({
  onCopy: config.onCopy,
  getOnCopy: getConfig,
});

if (config.watch ?? true) {
  const watcher = watch(path);
  for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    await restart();
  }
}
