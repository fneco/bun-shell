import { parseArgs } from "util";
import { detectPort } from "./lib/detectPort";

const { positionals } = parseArgs({
  strict: true,
  allowPositionals: true,
});
const port = positionals[0];

detectPort(parseInt(port));
