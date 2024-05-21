/**
 * @internal
 */
export const _onGetNew = <T extends number | bigint | string>(DI: {
  hash: (x: string) => T;
}) => {
  let hashValue = DI.hash("");

  /**
   *
   * @param input
   * @param callback called only when a different `input` is entered
   * @returns
   */
  return function onGetNew(input: string, callback: (input: string) => string) {
    if (hashValue !== DI.hash(input)) {
      const result = callback(input);
      hashValue = DI.hash(result);
    }
    return;
  };
};

export const createOnGetNew = () => _onGetNew({ hash: Bun.hash });
