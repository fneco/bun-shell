import { watch as bunWatch } from "fs/promises";
import { parseArgs } from "util";

const entrypoint = "./config.ts";

const {
  values: { watch },
} = parseArgs({
  strict: true,
  allowPositionals: true,
  options: { watch: { type: "boolean" } },
});

async function build() {
  const output = await Bun.build({ entrypoints: [entrypoint] });

  if (!output.success) {
    console.log("build failed");
    process.exit();
  }
  if (output.outputs.length !== 1) {
    console.log("unexpected outputs");
    process.exit();
  }
  const buildArtifact = output.outputs[0];
  await Bun.write(buildArtifact.path, buildArtifact);
}
await build();

if (watch) {
  const watcher = bunWatch(entrypoint);
  console.log(`start watching: ${entrypoint}`);
  for await (const event of watcher) {
    console.log(`Detected ${event.eventType} in ${event.filename}`);
    await build();
  }
}
