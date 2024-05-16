import { $ } from "bun";
import clipboardListener from "clipboard-event";
import clipboard from "clipboardy";
import { join } from "path";
import { onGetNew } from "../modules/util/onGetNew";
import type { Config } from "../type";

const EVENT_NAME = "change"; // https://github.com/sudhakar3697/node-clipboard-event/blob/0879a167f5643908349ff6b70a9365f9acdb652e/index.js#L29

const _startListening = async () => {
  try {
    clipboardListener.startListening();
  } catch (e) {
    const path = join(process.cwd(), "node_modules/clipboard-event/platform");
    await $`chmod -R 755 ${path}`;
    console.log(`added executable permission to "${path}". retry it.`);
    process.exit();
  }
};

const _stopListening = () => {
  // https://nodejs.org/api/child_process.html#subprocesskillsignal
  const succeed = clipboardListener.stopListening();
  if (!succeed) {
    console.log(`killing failed`);
    process.exit();
  }
};

export const startListening = async (
  getOnCopy: () => Promise<{ onCopy: Config["onCopy"] }>
): Promise<{
  restart: () => Promise<void>;
}> => {
  const listen = async () => {
    await _startListening();
    const { onCopy } = await getOnCopy();
    clipboardListener.on(EVENT_NAME, () => {
      onGetNew(clipboard.readSync(), (clipboardString) => {
        const edited = onCopy(clipboardString);
        clipboard.writeSync(edited);
        return edited;
      });
    });
    console.log("start listening clipboard event.");
  };
  await listen();

  const restart = async () => {
    clipboardListener.removeAllListeners(EVENT_NAME); // https://nodejs.org/api/events.html#emitterremovealllistenerseventname
    _stopListening();
    return listen();
  };

  return { restart };
};
