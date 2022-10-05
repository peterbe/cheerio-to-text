import fs from "fs"
import path from "path"

import { render } from "../src"

describe("End-to-ends", () => {
  const rt = "test/fixtures"
  const fixtures = fs
    .readdirSync(rt)
    .map((name) => path.join(rt, name))
    .filter((x) => x.endsWith(".html"))

  for (const fixture of fixtures) {
    it(`should cope with <${path.basename(fixture)}>`, () => {
      const html = fs.readFileSync(fixture, "utf-8")
      console.log(html.length)

      const text = render(html)
      console.log({ text })

      //const css = fs.readFileSync(path.join(fixture, "css.css"), "utf-8");
      //console.time(path.basename(fixture));
      //const { finalCSS, sizeBefore, sizeAfter } = minimize({ html, css });
      //console.timeEnd(path.basename(fixture));
      //expect(sizeAfter < sizeBefore).toBeTruthy();
      //expect(finalCSS).toBeTruthy();
    })
  }
})
