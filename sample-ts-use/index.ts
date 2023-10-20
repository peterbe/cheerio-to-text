import cheerio from "cheerio"
import { render } from "cheerio-to-text"

const HTML = `
<!doctype html>
<body>
  <div id="main">
   <p>Para<strong>graph</strong>.</p>
   <ul><li>Foo</li><li>Bar</li></ul><h3>Heading</h3>
  </div>
</body>
`.trim()

const $ = cheerio.load(HTML)
// console.assert(render($("#main")).includes("Paragraph."))
console.assert(render($("#main")).includes(123))
