import { piped } from "remeda";
import type { Config } from "./type";

const joinLines = (str: string) =>
  str.replace(/([\w|\.|\,])(\r\n|\n|\r)([\w])/gm, "$1 $3");
const deleteNewLine = (str: string) => str.replace(/(\r\n|\n|\r)/gm, "");
const splitJPSentence = (str: string) => str.replace(/(。)/gm, "。\n");

// example
export const config: Config = {
  onCopy: piped(joinLines, deleteNewLine, splitJPSentence),
};
