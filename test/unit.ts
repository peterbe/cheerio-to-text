import cheerio from "cheerio"

import { render } from "../src"

describe("Unit tests", () => {
  const TEMPLATE = `<!doctype html>
    <html>
    <body>
    BODY
    </body>
    </html>
  `

  it("should keep inlines together", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Para<b>gra</b><em>ph</em>.</p>
        `
    )
    const text = render(html)
    expect(text).toMatch(/Paragraph\./)
    expect(text).toBe(text.trim())
  })

  it("should be possible to send in a cheerio object", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Para<b>gra</b><em>ph</em>.</p>
        `
    )
    const $ = cheerio.load(html)
    const text = render($("body"))
    expect(text).toMatch(/Paragraph\./)
  })

  it("should be possible to send in a cheerio element", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Para<b>gra</b><em>ph</em>.</p>
        `
    )
    const $ = cheerio.load(html)
    const text = render($("body")[0])
    expect(text).toMatch(/Paragraph\./)
  })

  it("should keep block elements apart", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Foo</p><p>Bar.</p>
        `
    )
    const text = render(html)
    expect(text).toMatch(/Foo\nBar\./)
  })

  it("should keep block elements apart even if they're already apart", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Foo</p>



        <p>Bar.</p>
        `
    )
    const text = render(html)
    expect(text).toMatch(/Foo\nBar\./)
  })
})
