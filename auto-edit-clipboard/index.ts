import { watch } from "fs/promises";
import pDebounce from "p-debounce";
import { importConfig, parseArgs, startListening } from "./main";

const { absolutePathToConfig: path } = await parseArgs();

const getConfig = pDebounce(async () => importConfig(path), 200, {
  before: true,
});
const config = await getConfig();

const { restart, toggleListening /*TODO: use toggleListening*/ } =
  await startListening(getConfig);

if (config.watch ?? true) {
  const watcher = watch(path);
  for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    await restart();
  }
}
