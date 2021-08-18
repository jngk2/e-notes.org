import fs, { readFileSync } from "fs";
import hljs from 'highlight.js'
import marked from "marked";
import { getIndex } from "./get-index";
import { getHeader } from "./get-header";
import { getCodeBlock } from "./get-code";
import { Item } from "./build-index";
import { stripFrontmatter } from "./get-frontmatter";
import path from "path";
import { Meta } from "./build-posts";

const getMeta = (meta: Meta) => {
  if (meta && (meta.created || meta.updated)) {
    return `<div class="meta">
  Published:<span class="published">${meta.created}</span>
  Updated:<span class="updated">${meta.updated}</span>
    </div>`
  }
  return ''
}

const getHtml = async (file: Item, meta: Meta) => {
  let markdown = fs.readFileSync(file.fullname).toString()
  const index = getIndex()
  const header = getHeader()
  const codeDir = path.dirname(file.fullname)

  markdown = markdown
    .replace('__INDEX__', index)
    .replace('__HEADER__', header)
    .replace(/__CODE__\=(?<filename>[^\s]+)/g, (_, filename) => {
      if (!filename) {
        return ''
      }

      const codeFile = path.join(codeDir, filename)
      const code = readFileSync(codeFile).toString().trim()
      const codeblock = getCodeBlock(codeFile)

      return `${codeblock}\n<div class="raw-code">${code}</div>`;
    })
    .trim()

  marked.setOptions({
    highlight: (code, lang) => {
      return hljs.highlight(code, { language: lang }).value
    }
  })


  return `<div class="content-main">
    ${file.name !== 'index.md' && getMeta(meta) || ''}
  ${marked(stripFrontmatter(markdown))}
  </div>
  <div class="footer"> <a href="https://github.com/jngk2/e-notes.org">source</a> | <a href="mailto:jngk@posteo.net">e-mail</a></div>
`
}

export { getHtml }
