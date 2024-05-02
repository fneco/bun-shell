import { piped } from "remeda";
import type { Config } from "./type";

const joinLines = (str: string) =>
  str.replace(/([\w|\.|\,])(\r\n|\n|\r)([\w])/gm, "$1 $3");
const deleteNewLine = (str: string) => str.replace(/(\r\n|\n|\r)/gm, "");
const deleteComment = (str: string) => str.replace(/\/\/\s/gm, "");
const breakLineWithAPunctuationMark = (str: string) =>
  str.replace(/(。)/gm, "。\n");
const suppressDots = (str: string) => str.replace(/\.{4,}/gm, "...");
const addH2 = (str: string) => str.replace(/^第(.*)章/gm, "## 第 $1 章");

// example
export const config: Config = {
  onCopy: piped(
    joinLines,
    deleteNewLine,
    deleteComment,
    breakLineWithAPunctuationMark
  ),
};
