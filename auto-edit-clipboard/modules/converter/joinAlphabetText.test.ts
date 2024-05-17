import { expect, test } from "bun:test";
import { joinAlphabetText } from "./joinAlphabetText";
test("joinAlphabetText", () => {
  expect(
    joinAlphabetText(`aZ aZ
aZ aZ,
aZ aZ.
aZ
あいう
あいう、
あいう。`)
  ).toBe(
    `aZ aZ aZ aZ, aZ aZ. aZ
あいう
あいう、
あいう。`
  );
});
