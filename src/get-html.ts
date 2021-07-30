import fs, { readFileSync } from "fs";
import hljs from 'highlight.js'
import marked from "marked";
import { getIndex } from "./get-index";
import { getCodeBlock } from "./get-code";
import { Item } from "./build-index";
import { stripFrontmatter } from "./get-frontmatter";
import path from "path";

const getHtml = async (file: Item) => {
  let markdown = fs.readFileSync(file.fullname).toString()
  const index = getIndex()
  const codeDir = path.dirname(file.fullname)

  markdown = markdown
    .replace('__INDEX__', index)
    .replace(/__CODE__\=(?<filename>[^\s]+)/g, (_, filename) => {
      if (!filename) {
        return ''
      }

      const codeFile = path.join(codeDir, filename)
      const code = readFileSync(codeFile).toString().trim()
      const codeblock = getCodeBlock(codeFile)

      return `${codeblock}\n<div class="raw-code">${code}</div>`;
    })

  marked.setOptions({
    highlight: (code, lang) => {
      return hljs.highlight(code, { language: lang }).value
    }
  })

  return marked(stripFrontmatter(markdown))
}

export { getHtml }
