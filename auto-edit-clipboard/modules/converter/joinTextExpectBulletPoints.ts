import { newLineReg } from "./regex";

export const _shouldAppend = (line: string, acc: string[]) =>
  line.startsWith("- ") ||
  acc.length === 0 ||
  acc[acc.length - 1].startsWith("- ");

export const _concatToLast = (acc: string[], element: string): string[] => {
  if (acc.length === 0) return [element];
  const last = acc.pop() as string;
  return [...acc, last.concat(element)];
};

export const joinTextExpectBulletPoints = (str: string) => {
  return str
    .split(newLineReg)
    .reduce<string[]>((acc, line) => {
      if (_shouldAppend(line, acc)) return [...acc, line];
      return _concatToLast(acc, line);
    }, [])
    .join("\n");
};
