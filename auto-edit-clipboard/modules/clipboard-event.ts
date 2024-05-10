import { $ } from "bun";
import clipboardListener from "clipboard-event";
import clipboard from "clipboardy";
import { join } from "path";

export const startListening = async (onCopy: (str: string) => string) => {
  try {
    clipboardListener.startListening();
  } catch (e) {
    const path = join(__dirname, "node_modules/clipboard-event/platform");
    await $`chmod -R 755 ${path}`;
    console.log(`added executable permission to "${path}". retry it.`);
    process.exit();
  }

  clipboardListener.on("change", () => {
    const edited = onCopy(clipboard.readSync());
    clipboard.writeSync(edited);
  });
  console.log("start listening clipboard event.");
};