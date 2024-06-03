import { createLineByLineProcessor } from "./util/reduceLines";

/**
 * FIXME: don't use createLineByLineProcessor
 */
export const addBulletPoints = createLineByLineProcessor((acc, line) => {
  if (/^(-|#)/.test(line)) return [...acc, line];
  return [...acc, `- ${line}`];
});
