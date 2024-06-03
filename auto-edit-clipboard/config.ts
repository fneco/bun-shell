import { piped } from "remeda";
import {
  addBulletPoints,
  deleteSpaceBetweenNonAscii,
  joinAlphabetText,
  joinTextExpectBulletPoints,
} from "./modules/converter";
import { log } from "./modules/debug/log";
import type { Config } from "./type";

const deleteLastNewLine = (str: string) => str.replace(/(\r\n|\n|\r)$/g, "");
const deleteInitialNewLine = (str: string) => str.replace(/^(\r\n|\n|\r)/g, "");
const deleteAroundNewLine = piped(deleteInitialNewLine, deleteLastNewLine);

const deleteUnnecessaryEdge = (str: string) =>
  str.replace(/^.{0,1}(、|。)\s?/g, "").replace(/(、|。)\n?.{0,3}$/g, "$1");

const deleteComment = (str: string) => str.replace(/\s?\/\/\s/gm, "");
const normalizeBulletPoints = (str: string) =>
  str.replace(/^\s?(●|·|•|⁃|r )\s*(.*)$/gm, "- $2");
const joinLines = piped(joinAlphabetText, joinTextExpectBulletPoints);

const splitJPTextByPunctuationMark = (str: string) =>
  str.replace(/。\s?/g, "。\n").replace(/(\r\n|\n|\r)$/g, "");

const addMDBulletPoints = (str: string) => str.replace(/^([^-].*)$/gm, "- $1");
const suppressDots = (str: string) =>
  str
    .replace(/\.{4,}/gm, "...")
    .replace(/(· )/gm, "·")
    .replace(/(·){4,}/gm, "···")
    .replace(/(…){2,}/gm, "…")
    .replace(/(・){4,}/gm, "・・・");
const addH2章 = (str: string) =>
  str.replace(/^(第\s*)(.*)(\s*章)/gm, "## 第 $2 章");
const addH2Chapter = (str: string) =>
  str.replace(/^\s*(CHAPTER)\s*(\d+)\s*(.*)/gim, "## $1 $2 $3");
const addH3TwoNumberSeparated = (str: string) =>
  str.replace(/^\s*(\d+)\s*(.|-)\s*(\d+)\s*([^.|-])/gm, "### $1$2$3 $4");
const addH3TwoDigitNumber = (str: string) =>
  str.replace(/^\s*(\d\d)/gm, "### $1");
const addBPToThreeNumberSeparated = (str: string) =>
  str.replace(
    /^\s*(\d+)\s*(.|-)\s*(\d+)\s*(.|-)\s*(\d+)\s*/gm,
    "- $1$2$3$4$5 "
  );
// examples
const indexToMD = piped(
  log("indexToMD: before", { initial: true }),
  suppressDots,
  addH2Chapter,
  addH3TwoNumberSeparated,
  addBPToThreeNumberSeparated,
  addBulletPoints,
  log("indexToMD: after")
);
const normalizeEnglishComment = piped(deleteComment, joinAlphabetText);
const normalizeJpPDF = piped(
  log("before", { initial: true }),
  // log("before deleteUnnecessaryEdge", { initial: true }),
  deleteUnnecessaryEdge,
  // log("after deleteUnnecessaryEdge"),
  // log("before normalizeBulletPoints", { initial: true }),
  normalizeBulletPoints,
  // log("after normalizeBulletPoints"),
  // log("before joinLines", { initial: true }),
  joinLines,
  // log("after joinLines"),
  deleteSpaceBetweenNonAscii,
  splitJPTextByPunctuationMark,
  log("after")
);
const jpPDFIntoBulletPoints = piped(
  log("before normalizeJpPDF", { initial: true }),
  normalizeJpPDF,
  log("after normalizeJpPDF"),
  addMDBulletPoints
);

// example
export default {
  // onCopy: normalizeEnglishComment,
  // onCopy: jpPDFIntoBulletPoints,
  // onCopy: normalizeJpPDF,
  onCopy: indexToMD,
  watch: true,
} satisfies Config;
