import { fileURLToPath } from "bun";
import type { Page } from "puppeteer";
import { connectDebugBrowser } from "./connectDebugBrowser";

export const getFirstPageInDebugBrowser = (): Promise<Page> =>
  connectDebugBrowser()
    .then((browser) => browser.pages())
    .then((pages) => {
      return pages[0];
    });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  getFirstPageInDebugBrowser()
    .then(async (page) => {
      console.log({ title: await page.title(), url: page.url() });
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
