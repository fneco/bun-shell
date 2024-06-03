import { expect, test } from "bun:test";
import { bulletPoint } from "./regex";

test("bulletPoint", () => {
  expect(bulletPoint.test(`- abc`)).toBe(true);
  expect(bulletPoint.test(` - abc`)).toBe(true);
  expect(bulletPoint.test(`  - abc`)).toBe(true);
  expect(bulletPoint.test(`abc`)).toBe(false);
  expect(bulletPoint.test(`-abc`)).toBe(false);
});
