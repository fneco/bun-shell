import { parseArgs } from "util";
import { getFirstPageInDebugBrowser } from "./modules/getFirstPageInDebugBrowser";
import { htmlToJsx } from "./modules/htmlToJsx";
import { setting } from "./setting";

const { positionals } = parseArgs({
  strict: true,
  allowPositionals: true,
});

const selector = positionals[0];
if (selector == null) {
  console.log(`positional arg is required.`);
  process.exit();
}

await getFirstPageInDebugBrowser()
  .then((page) => page.$eval(selector, (node) => node.innerHTML))
  .then((html) => htmlToJsx(html))
  .then((jsx) =>
    Bun.write(
      `${setting.targetFolder}/components/component.jsx`,
      `export function Component() {
  return <>
    ${jsx}
  </>
}

`
    )
  )
  .catch((e) => console.log(e?.message));

process.exit();
