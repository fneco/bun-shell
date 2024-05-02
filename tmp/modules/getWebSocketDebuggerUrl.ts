import { fileURLToPath } from "bun";

export const getWebSocketDebuggerUrl = async (): Promise<string> =>
  // https://github.com/puppeteer/puppeteer/issues/3543#issuecomment-634211292
  fetch("http://127.0.0.1:9222/json/version")
    .then((response) => response.json())
    .then((json) => json.webSocketDebuggerUrl)
    .catch((e) => {
      if (e instanceof Error && e.message.includes("Unable to connect.")) {
        console.log('use "bun run launch.ts"');
      }
      return e;
    });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  getWebSocketDebuggerUrl()
    .then((x) => {
      console.log(x);
    })
    .catch((e) => {
      console.log(e.message);
    });
}
