import path from "path";
import fs from "fs";
import { isMarkdown } from "./util";
import { getHtml } from "./get-html";
import { getPost } from "./get-post";
import { toList } from "./to-list";
import { getFilters } from "./get-filters";

const rra = require('recursive-readdir-async')

const TEMPLATE = 'content-full-template.html'

const build = async (inDir: string, outDir: string) => {
  console.time('build-posts')

  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }

  const filterByTags = getFilters()

  const template = path.join(inDir, TEMPLATE)

  const list = await rra.list(inDir)

  for (const file of list) {
    if (isMarkdown(file)) {
      const partial = await getHtml(file)
      const post = getPost(file)
      const html = fs.readFileSync(template).toString()
        .replace('__CONTENT__', partial)
        .replace('__TAGS__', toList(filterByTags, 'tags-list'))
        .replace('__TITLE__', post && post.title || '')

      const outfile = path.join(outDir, file.name)
        .replace(/\.md$/, '.html')

      await fs.writeFileSync(outfile, html)
    }
  }

  console.timeEnd('build-posts')
}

export { build }
