import { piped } from "remeda";
import { deleteSpaceBetweenNonAscii } from "./modules/converter/deleteSpaceBetweenNonAscii";
import { joinAlphabetText } from "./modules/converter/joinAlphabetText";
import { joinTextExpectBulletPoints } from "./modules/converter/joinTextExpectBulletPoints";
import { log } from "./modules/debug/log";
import type { Config } from "./type";

const deleteLastNewLine = (str: string) => str.replace(/(\r\n|\n|\r)$/g, "");
const deleteInitialNewLine = (str: string) => str.replace(/^(\r\n|\n|\r)/g, "");
const deleteAroundNewLine = piped(deleteInitialNewLine, deleteLastNewLine);

const deleteUnnecessaryEdge = (str: string) =>
  str.replace(/^.{0,3}(、|。)\s?/g, "").replace(/(、|。)\n?.{0,3}$/g, "$1");

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
    .replace(/(·){4,}/gm, "···");
const addH2 = (str: string) => str.replace(/^第 +?(.*) +?章/gm, "## 第 $1 章");
const addH3 = (str: string) => str.replace(/^(\d+\.\d+ )/gm, "### $1");
const tmp = (str: string) =>
  str.replace(/^(.+)$/gm, "- $1").replace(/- #/g, "#");

// examples
const indexToMD = piped(suppressDots, addH2, addH3, tmp);
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
  onCopy: normalizeJpPDF,
  // onCopy: jpPDFIntoBulletPoints,
  // onCopy: indexToMD,
  watch: true,
} satisfies Config;
