import assert from "node:assert"
import { describe, it } from "node:test"

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
        `,
    )
    const text = render(html)
    assert(/Paragraph\./.test(text))
    assert(text === text.trim())
  })

  it("should be possible to send in a cheerio object", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Para<b>gra</b><em>ph</em>.</p>
        `,
    )
    const $ = cheerio.load(html)
    const text = render($("body"))
    assert(/Paragraph\./.test(text))
  })

  it("should be possible to send in a cheerio element", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Para<b>gra</b><em>ph</em>.</p>
        `,
    )
    const $ = cheerio.load(html)
    const text = render($("body")[0])
    assert(/Paragraph\./.test(text))
  })

  it("should keep block elements apart", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Foo</p><p>Bar.</p>
        `,
    )
    const text = render(html)
    assert(/Foo\nBar\./.test(text))
  })

  it("should keep block elements apart even if they're already apart", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <p>Foo</p>



        <p>Bar.</p>
        `,
    )
    const text = render(html)
    assert(/Foo\nBar\./.test(text))
  })

  it("should respect newlines inside pre blocks", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <pre>
        one
        two
        three
        </pre>
        `,
    )
    const text = render(html)
    assert(/one\ntwo\nthree/.test(text))
  })

  it("should separate a h1 from a following span", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <h1>Heading</h1><span>Text</span>
      `,
    )
    const text = render(html)
    assert(/Heading\nText/.test(text))
  })

  it("should separate a h2 followed by two inlines", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
        <h2>Heading</h2><i>Italic</i><b>Strong</b>
      `,
    )
    const text = render(html)
    assert(/Heading\nItalicStrong/.test(text))
  })

  it("should work with the example code in the README", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `
      <p>Para<strong>graph</strong>.</p>
      <ul><li>Foo</li><li>Bar</li></ul><h3>Heading</h3>
      `,
    )
    const text = render(html)
    assert(text === "Paragraph.\nFoo\nBar\nHeading")
  })

  it("should respect whitespace between two inline tags", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `<div><code class="text-bold f5">accept</code> <span class="color-fg-muted pl-2 f5">string</span></div>`,
    )
    const text = render(html)
    assert(text === "accept string")
  })

  it("should not add whitespace between two inline tags next to each other", () => {
    const html = TEMPLATE.replace(
      "BODY",
      `<div><code class="text-bold f5">accept</code><span class="color-fg-muted pl-2 f5">string</span></div>`,
    )
    const text = render(html)
    assert(text === "acceptstring")
  })
})
