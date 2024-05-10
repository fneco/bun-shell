import { $ } from "bun";
import clipboardListener from "clipboard-event";
import clipboard from "clipboardy";
import { join } from "path";

export const startListening = async (
  onCopy: (str: string) => string
): Promise<{
  restart: (anotherOnCopy: (str: string) => string) => void;
}> => {
  try {
    clipboardListener.startListening();
  } catch (e) {
    const path = join(__dirname, "node_modules/clipboard-event/platform");
    await $`chmod -R 755 ${path}`;
    console.log(`added executable permission to "${path}". retry it.`);
    process.exit();
  }

  let hash = Bun.hash("");
  clipboardListener.on("change", () => {
    const clipboardString = clipboard.readSync();
    if (hash !== Bun.hash(clipboardString)) {
      const edited = onCopy(clipboardString);
      clipboard.writeSync(edited);
      hash = Bun.hash(edited);
    }
  });
  console.log("start listening clipboard event.");

  const restart = (anotherOnCopy: (str: string) => string) => {
    clipboardListener.stopListening();
    clipboardListener.removeAllListeners(["change"]); // https://nodejs.org/api/events.html#emitterremovealllistenerseventname

    startListening(anotherOnCopy);
  };

  return { restart };
};
