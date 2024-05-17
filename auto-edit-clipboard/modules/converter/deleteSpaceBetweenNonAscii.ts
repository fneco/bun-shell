import { ascii } from "./regex";

export const _deleteNonAscii = (x: string) =>
  x.replace(new RegExp(`[^${ascii}]`, "g"), "");

export const deleteSpaceBetweenNonAscii = (x: string) =>
  x.replace(new RegExp(`([^${ascii}]) ([^${ascii}])`, "g"), "$1$2");
