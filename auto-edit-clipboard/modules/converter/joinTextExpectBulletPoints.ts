import { createLineByLineProcessor } from "./util/reduceLines";
import { bulletPoint } from "./util/regex";

export const isBulletPoint = (str: string) => bulletPoint.test(str);

export const _shouldAppend = (line: string, acc: string[]) =>
  isBulletPoint(line) ||
  acc.length === 0 ||
  acc[acc.length - 1].startsWith("- ");

export const _concatToLast = (acc: string[], element: string): string[] => {
  if (acc.length === 0) return [element];
  const last = acc.pop() as string;
  return [...acc, last.concat(element)];
};

export const joinTextExpectBulletPoints = createLineByLineProcessor(
  (acc, line) => {
    if (_shouldAppend(line, acc)) return [...acc, line];
    return _concatToLast(acc, line);
  }
);
