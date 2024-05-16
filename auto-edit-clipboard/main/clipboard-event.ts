import { $ } from "bun";
import clipboardListener from "clipboard-event";
import clipboard from "clipboardy";
import { join } from "path";
import { onGetNew } from "../modules/util/onGetNew";

type OnCopy = (str: string) => string;

export const startListening = async (
  getOnCopy: () => Promise<{ onCopy: OnCopy }>
): Promise<{
  restart: () => Promise<void>;
}> => {
  try {
    clipboardListener.startListening();
  } catch (e) {
    const path = join(__dirname, "node_modules/clipboard-event/platform");
    await $`chmod -R 755 ${path}`;
    console.log(`added executable permission to "${path}". retry it.`);
    process.exit();
  }

  const listen = async () => {
    const { onCopy } = await getOnCopy();
    clipboardListener.on("change", () => {
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
    clipboardListener.stopListening();
    clipboardListener.removeAllListeners(["change"]); // https://nodejs.org/api/events.html#emitterremovealllistenerseventname

    return listen();
  };

  return { restart };
};
