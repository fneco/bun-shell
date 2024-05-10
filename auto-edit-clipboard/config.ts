import { piped } from "remeda";
import type { Config } from "./type";

const deleteComment = (str: string) => str.replace(/\s?\/\/\s/gm, "");
const normalizeBulletPoints = (str: string) =>
  str.replace(/^[●]\s?(.*)$/gm, "- $1");

const joinAlphabetText = (str: string) =>
  str.replace(/([\w|\.|\,])(\r\n|\n|\r)([\w])/gm, "$1 $3");
const deleteNewLineExpectBP = (str: string) =>
  str.replace(/(^(- ))(\r\n|\n|\r)/gm, "");
const joinLines = piped(joinAlphabetText, deleteNewLineExpectBP);

const deleteLastNewLine = (str: string) => str.replace(/(\r\n|\n|\r)$/g, "");
const deleteInitialNewLine = (str: string) => str.replace(/^(\r\n|\n|\r)/g, "");
const deleteAroundNewLine = piped(deleteInitialNewLine, deleteLastNewLine);

const splitJPTextByPunctuationMark = (str: string) =>
  str.replace(/(.)(。)\s?(.)/gm, "$1。\n$3");

const addMDBulletPoints = (str: string) => str.replace(/^([^-].*)$/gm, "- $1");
const suppressDots = (str: string) => str.replace(/\.{4,}/gm, "...");
const addH2 = (str: string) => str.replace(/^第(.*)章/gm, "## 第 $1 章");

// example
export default {
  onCopy: piped(
    deleteComment,
    normalizeBulletPoints,
    joinLines,
    splitJPTextByPunctuationMark,

    addMDBulletPoints
  ),
  // onCopy: () => "yes",
  watch: true,
} satisfies Config;
