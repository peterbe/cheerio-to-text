import cheerio from "cheerio"
import { render } from "./lib/index.js"

main()
function main() {
  const html = `<!doctype html>
    <html>
        <head>
            <title>Example</title>
        </head>
        <body>

            <h1>Header</h1>

            <div class="stuff">
                <em>Sample text</em>
            </div>
            <div class="ingress">
                <p>Sample text</p>
            </div>

            <p>Stuff <strong>bold</strong></p>
    <pre>Code</pre><p>Paragrap</p><h3>Stuff</h3>

        </body>
    </html>
    `
  // console.log(render(html));
  // console.log(render(cheerio.load(html).root()));
  // console.log(render(cheerio.load(html).root()[0]));
  var text = render(cheerio.load(html)("body")[0])
  console.log({ text })
}
