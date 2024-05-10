import { tap } from "remeda";

let debug = false;
// debug = true;

let counter = 0;
export const log = (txt?: string, initial?: true): ((x: string) => string) => {
  if (!debug) return (x) => x;
  if (initial) {
    counter = 0;
  }
  const c = ++counter;
  return tap((x) => {
    console.log(`======= ${c}${txt ? ` : ${txt}` : ""} =======`);
    console.log(x);
    console.log();
    return x;
  });
};
