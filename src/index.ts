// import type { CheerioAPI, Cheerio, Element } from "cheerio";
import type { Element, Node, CheerioAPI, Document, AnyNode } from "cheerio"
// import cheerio, {  } from "cheerio";
import cheerio from "cheerio"

// interface Options {
//   debug?: boolean;
//   rootTag?: string;
// }
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
  node: CheerioAPI | Document | string
  // node: Element | string
  // options: Options = {}
): string {
  // if (options.debug) console.time("parse");
  // if (typeof node === "object") console.log(Object.keys(node));
  // const rootTag = options.rootTag || "body";
  // const root =
  //   typeof node === "string"
  //     ? cheerio.load(node).root()[0]
  //     : typeof node === "function"
  //     ? node.root()
  //     : node;
  let root: Document | null = null
  if (typeof node === "string") {
    root = cheerio.load(node).root()[0]
  } else if (typeof node === "object" && "0" in node) {
    root = node[0]
  } else if (typeof node === "object" && "children" in node) {
    root = node
    // } else {
    //   console.log("TYPE:", typeof node)
    //   console.log(node)
  }

  if (!root) {
    throw new Error(
      "node was not a string, cheerio loaded document, or a cheerio node"
    )
  }

  // console.log(root.children);
  // console.log(root.type);

  // if (options.debug) console.timeEnd("parse");

  let text = ""
  let previousTag = ""
  function enter(element: AnyNode) {
    // console.log("ENTER", element);
    // console.log("\tTYPE?", element.type);
    // console.log("\tkeys?", Object.keys(element));
    if (element.type === "text") {
      // console.log("\tDATA??", {
      //   type: element.type,
      //   data: element.data,
      //   previousTag,
      // })
      if (element.data.trim()) text += element.data
    } else if (element.type === "tag") {
      // console.log("\tTAG", element.tagName)
      if (!inlineElements.has(element.tagName)) {
        if (text.at(-1) !== "\n") text += "\n"
      }
      previousTag = element.tagName
    }

    // if (element.type === "tag") {
    //   console.log("IS TAG!", element.tagName);
    // } else {
    //   console.log("OTHER TTYPE", { type: element.type });
    // }
    // if (element.type === "text") {
    //   console.log("IS TEXT!", element.data);
    // }

    // if (element.type == "tag") {
    //   console.log("INSIDE TAG", element);

    //   // head = elements.get(element.name).push(head);
    //   // head.element = element;
    // } else if (element.type === "text") {
    //   // head.content.push(text.Inline(element.data));
    // }
  }

  function leave(element: AnyNode) {
    // console.log("LEAVE", element);
    // if (element.type == "tag") {
    //   head = head.pop(elements.get(element.name).pop);
    // }
  }

  // // const root = $("body")[0];
  // // const root2 = $[0];
  // // // console.log(root.type);

  // // const kids = root.children;

  walk(root, enter, leave)

  // return $.text();
  console.log("HELLO")

  return text.trim()
}

// typeof<enter> ??
function walk(root: AnyNode, enter: Function, leave: Function) {
  enter(root)
  if (root.type === "tag") {
    for (const child of root.children) {
      walk(child, enter, leave)
    }
  }
  leave(root)
}
