import { startListening } from "./modules/clipboard-event";
import { importConfig } from "./modules/import-config";
import { parseArgs } from "./modules/parse-args";

const { absolutePathToConfig: path } = await parseArgs();

const config = await importConfig(path);

startListening(config.onCopy);
