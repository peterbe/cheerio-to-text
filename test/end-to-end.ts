import assert from "node:assert"
import { describe, it } from "node:test"
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
      assert(text.length > 1_000)
      if (path.basename(fixture) === "code-security-guides.html") {
        // Highlight a few specific examples which have caused bugs before.
        assert(/Show 3 more guides/.test(text))
        assert(!/Show 3more guides/.test(text))
        assert(/ities are reported\.\nStart learning path/.test(text))
      }
    })
  }
})

describe("spot check some large fixtures", () => {
  it("should not lump certain words together", () => {
    const html = fs.readFileSync(
      "test/fixtures/_en_actions_using-workflows_workflow-syntax-for-github-actions.html",
      "utf-8",
    )
    const text = render(html)
    assert(/irectory of your repository.\nname/.test(text))
    assert(/github and inputs contexts.\nExample\nrun-name/.test(text))
  })
})
