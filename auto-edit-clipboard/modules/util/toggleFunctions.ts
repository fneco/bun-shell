export const toggleFunctions = <A extends () => any, B extends () => any>(
  a: A,
  b: B
): (() => ReturnType<A> | ReturnType<B>) => {
  let flag = true;
  return function toggle() {
    const ret = flag ? a() : b();
    flag = !flag;
    return ret;
  };
};
