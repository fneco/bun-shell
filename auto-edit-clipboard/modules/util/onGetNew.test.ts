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
  const hash = mock((x: string) => x);
  const test_onGetNew = _onGetNew({ hash: hash });

  expect(hash).toHaveBeenCalledTimes(1); // 初期化で呼ばれる
  expect(hash).toHaveBeenCalledWith(""); // 空文字列で初期化される

  test_onGetNew("a", (x) => x);
  expect(hash).toHaveBeenCalledTimes(3); // 初回では2度呼ばれる

  test_onGetNew("a", (x) => x);
  expect(hash).toHaveBeenCalledTimes(4); // 前回("a")と同一の`input`の場合1度のみ呼ばれる

  test_onGetNew("b", (x) => x);
  expect(hash).toHaveBeenCalledTimes(6); // 前回("a")と異なる`input`("b")の場合2度呼ばれる
});
