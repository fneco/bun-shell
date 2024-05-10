import type { Config } from "../type";

export const importConfig = async (filename: string) => {
  return import(filename)
    .then((module) => {
      if (!("default" in module)) {
        return Promise.reject(
          new Error("the config module should use `export default`.")
        );
      }
      if (!("onCopy" in module.default)) {
        return Promise.reject(
          new Error("the config module should have `onCopy` function.")
        );
      }
      return module.default as Config;
    })
    .catch((err) => {
      console.log(`${filename} is not a valid TS file.`);
      console.log();
      console.log(err);
      process.exit();
    });
};
