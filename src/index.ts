import type { Element, CheerioAPI, Document, AnyNode, Cheerio } from "cheerio"
import cheerio from "cheerio"

const inlineElements = new Set(
  `a,abbr,acronym,audio,b,bdi,bdo,big,br,button,canvas,cite,code,data,
  datalist,del,dfn,em,embed,i,iframe,img,input,ins,kbd,label,map,mark,
  meter,noscript,object,output,picture,progress,q,ruby,s,samp,script,
  select,slot,small,span,strong,sub,sup,svg,template,textarea,time,
  tt,u,var,video,wbr`
    .split(",")
    .map((s) => s.trim())
)

export function render(
  node: CheerioAPI | Document | string | Element | Cheerio<Element>
): string {
  let root: Document | Element | null = null
  if (typeof node === "string") {
    root = cheerio.load(node)("body")[0]
  } else if (typeof node === "object" && "0" in node) {
    root = node[0]
  } else if (typeof node === "object" && "children" in node && "type" in node) {
    root = node
  }

  if (!root) {
    throw new Error(
      "node was not a string, cheerio loaded document, or a cheerio node"
    )
  }

  let text = ""
  function enter(element: AnyNode) {
    if (element.type === "text") {
      if (element.data.trim()) text += element.data
    } else if (element.type === "tag") {
      if (!inlineElements.has(element.tagName)) {
        if (text.at(-1) !== "\n") text += "\n"
      }
    }
  }

  walk(root, enter)

  return text.trim()
}

function walk(root: AnyNode, enter: (element: AnyNode) => void) {
  enter(root)
  if (root.type === "tag") {
    for (const child of root.children) {
      walk(child, enter)
    }
  }
}
