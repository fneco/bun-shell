/**
 *
 * @param x first arg of `git clone`
 * @returns
 */
export const folderName = (x: string): string | undefined => {
  return x.split("/").pop()?.replace(".git", "");
};
