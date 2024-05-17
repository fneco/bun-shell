import { expect, mock, test } from "bun:test";
import { _onGetNew, onGetNew } from "./onGetNew";

test("`callback` is called only when a different `input` is entered than the previous one.", () => {
  const fn = mock((x: string) => x);
  onGetNew("a", fn);
  expect(fn).toHaveBeenCalledTimes(1);
  onGetNew("a", fn);
  expect(fn).toHaveBeenCalledTimes(1);
  onGetNew("b", fn);
  expect(fn).toHaveBeenCalledTimes(2);
  onGetNew("b", fn);
  expect(fn).toHaveBeenCalledTimes(2);
  onGetNew("a", fn);
  expect(fn).toHaveBeenCalledTimes(3);
});

test("how to use dependency.", () => {
  const repeatTwo = (x: string) => x + x;
  const hash = mock((x: string) => x);
  const test_onGetNew = _onGetNew({ hash });

  expect(hash).toHaveBeenNthCalledWith(1, ""); // 空文字列で初期化される

  //初回呼び出し
  test_onGetNew("a", repeatTwo);
  expect(hash).toHaveBeenCalledTimes(3);
  expect(hash).toHaveBeenNthCalledWith(2, "a"); // 入力値を受け取る
  expect(hash).toHaveBeenNthCalledWith(3, "aa"); // 結果値を受け取る

  // 今回入力値("aa")と前回結果値("aa")とが同一の場合
  test_onGetNew("aa", repeatTwo);
  expect(hash).toHaveBeenCalledTimes(4);
  expect(hash).toHaveBeenNthCalledWith(4, "aa"); // 入力値を受け取る

  // 今回入力値("b")と前回結果値("aa")とが異なるの場合
  test_onGetNew("b", repeatTwo);
  expect(hash).toHaveBeenCalledTimes(6);
  expect(hash).toHaveBeenNthCalledWith(5, "b"); // 入力値を受け取る
  expect(hash).toHaveBeenNthCalledWith(6, "bb"); // 結果値を受け取る
});
