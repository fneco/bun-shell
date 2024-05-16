import { tap } from "remeda";

let debug: boolean = false;
// debug = true;

let counter = 0;
export const log = (
  txt?: string,
  option?: { initial?: true; debug?: boolean }
): ((x: string) => string) => {
  const shouldDebug = option?.debug ?? debug;
  if (!shouldDebug) return (x) => x;
  if (option?.initial === true) {
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
