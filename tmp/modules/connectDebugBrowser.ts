import { fileURLToPath } from "bun";
import puppeteer, { Browser } from "puppeteer";
import { getWebSocketDebuggerUrl } from "./getWebSocketDebuggerUrl";

export const connectDebugBrowser = async (): Promise<Browser> =>
  getWebSocketDebuggerUrl().then((browserWSEndpoint) =>
    puppeteer.connect({
      browserWSEndpoint,
    })
  );

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  connectDebugBrowser()
    .then((browser) => {
      console.log({
        wsEndpoint: browser.wsEndpoint(),
        connected: browser.connected,
      });
    })
    .catch((e) => {
      console.log('use "bun run launch.ts"');
      console.log("---");
      console.log(e);
    })
    .finally(() => {
      process.exit();
    });
}
