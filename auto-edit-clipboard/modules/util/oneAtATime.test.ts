import { expect, mock, test } from "bun:test";
import { oneAtATime } from "./oneAtATime";

test("oneAtATime", async () => {
  const fn = mock(() => undefined);
  const asyncFn = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    fn();
    return;
  };

  const limited = oneAtATime(asyncFn);
  limited(); // called
  limited(); // should be cancelled
  limited(); // should be cancelled
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(fn).toHaveBeenCalledTimes(1);

  fn.mockClear();
  asyncFn(); // called
  limited(); // called
  asyncFn(); // called
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(fn).toHaveBeenCalledTimes(3);
});
