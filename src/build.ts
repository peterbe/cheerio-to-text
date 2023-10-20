import { join } from "path"
import { mkdirSync, renameSync } from "fs"

const DIST_DIR = "./lib"

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: join(DIST_DIR, "esm"),
  target: "node",
  format: "esm",
})

// await Bun.build({
//   entrypoints: ["./src/index.ts"],
//   outdir: DIST_DIR,
//   target: "node",
//   format: "cjs",
// })

// await retroFix()

async function retroFix() {
  // Got this from
  // https://github.com/oven-sh/bun/issues/5707#issuecomment-1730511178
  const IMPORT_META_REQUIRE_POLYFILL = `import { createRequire as createImportMetaRequire } from "module"; import.meta.require ||= (id) => createImportMetaRequire(import.meta.url)(id);`
  const ESM_DIR = join(DIST_DIR, "esm")
  mkdirSync(ESM_DIR, { recursive: true })
  renameSync("lib/index.js", "lib/esm/index.js")
  const ESM_FILE = join(ESM_DIR, "index.js")
  const outputFile = Bun.file(ESM_FILE)
  const output = await outputFile.text()
  const newLines: string[] = []
  for (const line of output.split("\n")) {
    newLines.push(line)
    if (line.startsWith("#!")) {
      newLines.push(IMPORT_META_REQUIRE_POLYFILL)
    }
  }
  const newOutput = newLines.join("\n")
  await Bun.write(ESM_FILE, newOutput)

  await Bun.write(join(DIST_DIR, "esm", "package.json"), '{"type":"module"}')
  // await Bun.write(DIST_FILE, newOutput)
}
