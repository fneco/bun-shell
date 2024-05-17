export const joinAlphabetText = (str: string) =>
  str.replace(/([\w|\.|\,])(\r\n|\n|\r)([\w])/gm, "$1 $3");
