import pLimit from "p-limit";

const limit = pLimit(1); // limit to 1 concurrent execution

export const oneAtATime = <T extends () => Promise<unknown>>(fn: T) => {
  return () =>
    limit(async () => {
      const promise = fn();
      limit.clearQueue();
      return promise;
    });
};
