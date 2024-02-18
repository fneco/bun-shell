import { expect, test } from "bun:test";
import { folderName } from "./extract";

test("github repo url with .git", () => {
  expect(folderName("https://github.com/oven-sh/bun.git")).toBe("bun");
});

test("github repo url", () => {
  expect(folderName("https://github.com/oven-sh/bun")).toBe("bun");
});
