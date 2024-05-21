import { watch as bunWatch } from "fs";
import { parseArgs } from "util";
import { oneAtATime } from "../modules/util";

const entrypoint = "./config.ts";
const dependingFolder = "./modules";

const {
  values: { watch },
} = parseArgs({
  strict: true,
  allowPositionals: true,
  options: { watch: { type: "boolean" } },
});

const build = oneAtATime(async function build() {
  const output = await Bun.build({ entrypoints: [entrypoint] });

  if (!output.success) {
    console.log("build failed");
  }
  if (output.outputs.length !== 1) {
    console.log("unexpected outputs");
  }
  const buildArtifact = output.outputs[0];
  await Bun.write(buildArtifact.path, buildArtifact);
});
await build();

if (watch) {
  const cb = (event: string, filename: string | null) => {
    console.log(`Detected ${event} in ${filename}`);
    build();
  };
  console.log(`start watching`);
  bunWatch(dependingFolder, { recursive: true }, cb);
  bunWatch(entrypoint, cb);
}
