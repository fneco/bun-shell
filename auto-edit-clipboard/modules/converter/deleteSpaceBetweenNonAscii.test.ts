import { expect, test } from "bun:test";
import {
  _deleteNonAscii,
  deleteSpaceBetweenNonAscii,
} from "./deleteSpaceBetweenNonAscii";

test("deleteNonAscii", () => {
  expect(_deleteNonAscii("あ abc def いう亜g⭐️")).toBe(" abc def g");
});

test("deleteSpaceBetweenNonAscii", () => {
  expect(
    deleteSpaceBetweenNonAscii(
      `注: モジュールサイズと 欠陥密度（バグ密度） との関係についての学問的な研究は、
論文、『Module Size Distribution and Defect Density』 を参照。`
    )
  ).toBe(
    `注: モジュールサイズと欠陥密度（バグ密度）との関係についての学問的な研究は、
論文、『Module Size Distribution and Defect Density』を参照。`
  );
});
