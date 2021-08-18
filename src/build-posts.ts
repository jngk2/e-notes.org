import path from "path";
import fs from "fs";
import { isMarkdown } from "./util";
import { getHtml } from "./get-html";
import { getPost } from "./get-post";
import { Item } from "./build-index";

const rra = require('recursive-readdir-async')

export interface Meta {
  created: string
  updated: string
}

const templateFile = path.resolve(__dirname, 'templates', 'default.html')

const build = async (inDir: string, outDir: string) => {
  console.time('build-posts')

  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }

  const list = await rra.list(inDir)

  const index = fs.readFileSync(path.resolve('build/index.json')).toString()

  const { tags: unsortedTags } = JSON.parse(index)

  const tags = Object.keys(unsortedTags)
    .sort((a, b) => {
      return unsortedTags[b] - unsortedTags[a]
    })

  console.log(tags)

  const getContent = async (file: Item, meta: Meta) => `
    <div class="column-main" >
    ${await getHtml(file, meta)}
    </div>
    `

  for (const file of list) {
    if (isMarkdown(file)) {
      const post = getPost(file)
      const html = fs.readFileSync(templateFile).toString()
        .replace('__CONTENT__', await getContent(file, post as Meta))
        .replace('__TITLE__', post && post.title || '')

      const outfile = path.join(outDir, file.name)
        .replace(/\.md$/, '.html')

      await fs.writeFileSync(outfile, html)
    }
  }

  console.timeEnd('build-posts')
}

export { build }
