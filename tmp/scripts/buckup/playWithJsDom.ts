// c.f. https://zenn.dev/cat12079801/articles/6c09dd82df3c40

import { JSDOM } from "jsdom";

async function main() {
  const url = "https://zenn.dev/cat12079801/articles/6c09dd82df3c40";

  const dom = await JSDOM.fromURL(url);
  const document = dom.window.document;

  console.log({
    item: document.getElementsByTagName("h1").item(0)?.textContent,
  });
}

main();
