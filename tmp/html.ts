import { getFirstPageInDebugBrowser } from "./modules/getFirstPageInDebugBrowser";
import { setting } from "./setting";

await getFirstPageInDebugBrowser()
  .then((page) => page.content())
  .then((content) => Bun.write(`${setting.targetFolder}/loaded.html`, content))
  .catch((e) => console.log(e?.message));

process.exit();
