import { piped } from "remeda";
import { joinTextExpectBulletPoints } from "./modules/converter/joinTextExpectBulletPoints";
import { log } from "./modules/debug/log";
import type { Config } from "./type";

const deleteLastNewLine = (str: string) => str.replace(/(\r\n|\n|\r)$/g, "");
const deleteInitialNewLine = (str: string) => str.replace(/^(\r\n|\n|\r)/g, "");
const deleteAroundNewLine = piped(deleteInitialNewLine, deleteLastNewLine);

const deleteComment = (str: string) => str.replace(/\s?\/\/\s/gm, "");
const normalizeBulletPoints = (str: string) =>
  str.replace(/^[●]\s?(.*)$/gm, "- $1");

const joinAlphabetText = (str: string) =>
  str.replace(/([\w|\.|\,])(\r\n|\n|\r)([\w])/gm, "$1 $3");
const joinLines = piped(joinAlphabetText, joinTextExpectBulletPoints);

const splitJPTextByPunctuationMark = (str: string) =>
  str.replace(/。\s?/g, "。\n").replace(/(\r\n|\n|\r)$/g, "");

const addMDBulletPoints = (str: string) => str.replace(/^([^-].*)$/gm, "- $1");
const suppressDots = (str: string) => str.replace(/\.{4,}/gm, "...");
const addH2 = (str: string) => str.replace(/^第(.*)章/gm, "## 第 $1 章");

// examples
const normalizeEnglishComment = piped(deleteComment, joinAlphabetText);
const normalizeJpPDF = piped(
  normalizeBulletPoints,
  joinLines,
  splitJPTextByPunctuationMark
);
const jpPDFIntoBulletPoints = piped(
  normalizeBulletPoints,
  log("before joinLines", true),
  joinLines,
  log("after joinLines"),
  splitJPTextByPunctuationMark,
  addMDBulletPoints,
  log("after addMDBulletPoints")
);

// example
export default {
  // onCopy: normalizeEnglishComment,
  onCopy: jpPDFIntoBulletPoints,
  watch: true,
} satisfies Config;
