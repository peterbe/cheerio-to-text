import { join } from "path"
import { copyFileSync, mkdirSync, renameSync } from "fs"

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

await retroFix()

async function retroFix() {
  // Got this from
  // https://github.com/oven-sh/bun/issues/5707#issuecomment-1730511178
  const IMPORT_META_REQUIRE_POLYFILL = `import { createRequire as createImportMetaRequire } from "module"; import.meta.require ||= (id) => createImportMetaRequire(import.meta.url)(id);`
  // renameSync("lib/index.js", "lib/esm/index.js")
  const CJS_FILE = join(DIST_DIR, "index.js")
  copyFileSync(join(DIST_DIR, "esm", "index.js"), CJS_FILE)

  // const outputFile = Bun.file(CJS_FILE)
  // const output = await outputFile.text()
  // const newLines: string[] = []
  // newLines.push(IMPORT_META_REQUIRE_POLYFILL)
  // for (const line of output.split("\n")) {
  //   newLines.push(line)
  //   // if (line.startsWith("#!")) {
  //   //   console.log("WRITING")

  //   // }
  // }
  // const newOutput = newLines.join("\n")

  // // console.log(newOutput.slice(0, 2000))

  // await Bun.write(CJS_FILE, newOutput)

  await Bun.write(join(DIST_DIR, "esm", "package.json"), '{"type":"module"}')
  // await Bun.write(DIST_FILE, newOutput)
}
