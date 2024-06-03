import { expect, test } from "bun:test";
import { addBulletPoints } from "./addBulletPoints";

test("addBulletPoints", () => {
  expect(
    addBulletPoints(`- aZ
# aZ
aZ
## aZ
aZ`)
  ).toBe(
    `- aZ
# aZ
- aZ
## aZ
- aZ`
  );
});
