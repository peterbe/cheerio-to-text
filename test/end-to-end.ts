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
      const text = render(html)
      expect(text.length).toBeGreaterThan(1_000)
    })
  }
})

describe("spot check some large fixtures", () => {
  it("should not lump certain words together", () => {
    const html = fs.readFileSync(
      "test/fixtures/_en_actions_using-workflows_workflow-syntax-for-github-actions.html",
      "utf-8"
    )
    const text = render(html)
    expect(text).toMatch(/irectory of your repository.\nname/)
    expect(text).toMatch(/github and inputs contexts.\nExample\nrun-name/)
  })
})
