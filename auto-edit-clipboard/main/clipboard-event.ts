import { $ } from "bun";
import clipboardListener from "clipboard-event";
import clipboard from "clipboardy";
import { join } from "path";
import { createOnGetNew, toggleFunctions } from "../modules/util";
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
  clipboardListener.removeAllListeners(EVENT_NAME); // https://nodejs.org/api/events.html#emitterremovealllistenerseventname
};

export const startListening = async (
  getOnCopy: () => Promise<{ onCopy: Config["onCopy"] }>
) => {
  const listen = async () => {
    const onGetNew = createOnGetNew();
    await _startListening();
    const { onCopy } = await getOnCopy();
    clipboardListener.on(EVENT_NAME, () => {
      // when taking a screenshot on a Mac
      if (clipboard.readSync() === "") {
        return;
      }
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
    _stopListening();
    await listen();
    return;
  };

  const toggleListening = toggleFunctions(async () => {
    _stopListening();
    console.log("stop listening.");
    return Promise.resolve();
  }, listen);

  return { restart, toggleListening };
};
