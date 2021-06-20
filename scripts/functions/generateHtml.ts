import fs, { readFileSync } from "fs";
import hljs from 'highlight.js'
import marked from "marked";
import { stripFrontmatter } from "./frontmatter/frontmatter";
import path from "path";

const extensions: { [key: string]: string } = {
  '.ts': 'typescript',
  '.py': 'python'
}

const replaceCode = (contents: string, dirname: string): string => {
  const regex = /__CODE__\=(?<filename>[^\s]+)/g
  const matches = contents.matchAll(regex)

  for (const match of matches) {
    const filename = match?.groups?.['filename'];
    if (filename && match && match[0]) {

      const ext = path.extname(filename)

      const codeFile = readFileSync(path.join(dirname, filename))
      contents = contents.replace(
        match[0],
        ` \`\`\`${ext in extensions ? extensions[ext] : ''}\n${codeFile.toString().trim()}\n\`\`\`\ `
      )
    }
  }

  return contents
}

const generateHtml = async (filePath: string, fullTemplatePath: string) => {
  let contents = fs.readFileSync(filePath).toString()

  contents = replaceCode(contents, path.dirname(filePath))

  marked.setOptions({
    highlight: (code, lang) => {
      return hljs.highlight(code, { language: lang }).value
    }
  })

  return fs.readFileSync(fullTemplatePath).toString()
    .replace('__CONTENT__', marked(stripFrontmatter(contents)))
}

export { generateHtml }
