import puppeteer from "puppeteer";

/*
👇 と同じ
sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
※ sudo は必要
*/

const browser = await puppeteer.launch({
  // args: ["--remote-debugging-port=9222"],
  debuggingPort: 9222,
  headless: false,
});

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, async function () {
    await browser.close();
    console.log();
    console.log("browser.close()");
    process.exit();
  });
});

console.log(browser.wsEndpoint());
