# cheerio-to-text

Explained by an example:

```js
import fs from "fs"
import cheerio from "cheerio"
import { render } from "cheerio-to-text"

const html = fs.readFileSync("page.html", "utf-8")
console.log(html)
//
// <!doctype html>
// <body>
//   <div id="main">
//    <p>Para<strong>graph</strong>.</p>
//    <ul><li>Foo</li><li>Bar</li></ul><h3>Heading</h3>
//   </div>
// </body>
//

const $ = cheerio.load(html)
console.log($("div#main").text())
//
//  Paragraph.
//  FooBarHeading
//

console.log(render($("div#main")))
//
//  Paragraph.
//  Foo
//  Bar
//  Heading
//
```

Much of the origin of this that [GitHub Docs](https://docs.github.com) scrapes
every page with `got` and `cheerio` and then needs to convert that into an
appropriate string of plain text that it can use for searching
with Elasticsearch. Using `myCheerioObject.text()` isn't good enough
because it lumps together HTML blocking tags that have no whitespace
between the `>` and the next `<`.

## License

MIT

## How to hack

Run `npm run build:watch` in one terminal the look at
`example.mjs` (which you run with `node example.mjs`)

## How to run tests

```sh
npm run test:test
```

Or

```sh
npm run test:test -- --watch
```
