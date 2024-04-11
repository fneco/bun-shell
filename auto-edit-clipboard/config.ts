import type { Config } from "./type";

// example
export const config: Config = {
  onCopy: (str: string) => str.replace(/(\r\n|\n|\r)/gm, ""),
};
