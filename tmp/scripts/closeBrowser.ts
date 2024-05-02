import { connectDebugBrowser } from "../modules/connectDebugBrowser";

/**
 * When the connection did not work,
 * I closed it once, and the next time it worked.
 */

await connectDebugBrowser()
  .then((browser) => {
    console.log({
      wsEndpoint: browser.wsEndpoint(),
      connected: browser.connected,
    });

    return browser.close();
  })
  .catch((e) => {
    console.log("fail");
    if (e instanceof Error) {
      console.log(e.message);
    }
  });
