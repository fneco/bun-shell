import { newLine } from "./regex";

type Reducer = (
  previousValue: string[],
  currentValue: string,
  currentIndex: number,
  array: string[]
) => string[];
export const createLineByLineProcessor =
  (reducer: Reducer) => (str: string) => {
    return str.split(newLine).reduce(reducer, []).join("\n");
  };
