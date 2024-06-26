import { describe, expect, test } from "bun:test";
import {
  _concatToLast,
  _shouldAppend,
  joinTextExpectBulletPoints,
} from "./joinTextExpectBulletPoints";

type Case<T extends (...args: any) => any> = [...Parameters<T>, ReturnType<T>];

describe("shouldAppend", () => {
  const line = "line without bullet point";
  const lineWithBulletPoint = "- line";
  const cases = [
    [line, [line], false], // false || false || false
    [lineWithBulletPoint, [line], true], // true
    [line, [], true], // false || true
    [line, [lineWithBulletPoint], true], // false || false || true
  ] as Case<typeof _shouldAppend>[];

  test.each(cases)("%p, %p, %p should be %p", (a, b, expected) => {
    expect(_shouldAppend(a, b)).toBe(expected);
  });
});

describe("concatToLast", () => {
  const cases = [
    [[], "a", ["a"]],
    [["a"], "b", ["ab"]],
    [["a", "b"], "c", ["a", "bc"]],
  ] as Case<typeof _concatToLast>[];

  test.each(cases)("%p, %p, %p should be %p", (a, b, expected) => {
    expect(_concatToLast(a, b)).toEqual(expected);
  });
});

test("example 1", () => {
  expect(
    joinTextExpectBulletPoints(`このような目
的のため、いくつか人気のライブラリがあります。
- gopkg.in/alecthomas/kingpin.v2
- github.com/spf13/cobra
次のサンプルは kingpinを使って検索エンジンを作った時のものです。 2つのサブコマンド create-indexと searchがあり、それぞれにフラグがあります。サブコマンドの前に共通のフラグ default-languageも定義しています。また、フラグの後の引数にも名前や型が設定でき、 --helpでヘルプがわ
かりやすく表示されます。`)
  ).toBe(`このような目的のため、いくつか人気のライブラリがあります。
- gopkg.in/alecthomas/kingpin.v2
- github.com/spf13/cobra
次のサンプルは kingpinを使って検索エンジンを作った時のものです。 2つのサブコマンド create-indexと searchがあり、それぞれにフラグがあります。サブコマンドの前に共通のフラグ default-languageも定義しています。また、フラグの後の引数にも名前や型が設定でき、 --helpでヘルプがわかりやすく表示されます。`);
});

test("example 2", () => {
  const input = `- モジュール（module） またはコンポーネント（component） ― アプリケーションの
ソースコードの一部で、別々のフォルダで管理され、別々のバイナリファイルとしてビ
ルドされるもの。`;
  const expected = `- モジュール（module） またはコンポーネント（component） ― アプリケーションの
ソースコードの一部で、別々のフォルダで管理され、別々のバイナリファイルとしてビルドされるもの。`;
  expect(joinTextExpectBulletPoints(input)).toBe(expected);
});

test("example 3", () => {
  const input = `- 管理ポリシー
- インラインポリシー（インラインアイデンティティポリシー）
  - 特定の IAM ロール、IAM ユーザー、IAM グループに所属するアイデンティティポリシー
  - インラインアイデンティティポリシーは、その所属先となるロール、ユーザー、グループなしには存在できない
  - CloudFormation を利用すれば、インラインアイデンティティポリシーを管理するのは簡単です
    - そこで本書では、ほとんどの場合、インラインアイデンティティポリシーを使います。`;
  const expected = input;
  expect(joinTextExpectBulletPoints(input)).toBe(expected);
});
