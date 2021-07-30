import path from "path";
import fs from "fs";
import { isMarkdown } from "./util";
import { getHtml } from "./get-html";
import { getPost } from "./get-post";
import { toList } from "./to-list";
import { Item } from "./build-index";

const rra = require('recursive-readdir-async')

const templateFile = path.resolve(__dirname, 'templates', 'default.html')

const build = async (inDir: string, outDir: string) => {
  console.time('build-posts')

  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }

  const list = await rra.list(inDir)

  const index = fs.readFileSync(path.resolve('build/index.json')).toString()

  const { tags: unsortedTags, pinned } = JSON.parse(index)

  const tags = Object.keys(unsortedTags)
    .sort((a, b) => {
      return unsortedTags[b] - unsortedTags[a]
    })

  const sidebarHtml = `
  <div class="sidebar">
    ${toList(pinned, 'pinned')}
    ${toList(tags, 'tags')}
  </div>`;

  const footerHtml = `
    <div class="footer">
        <a href="#">github.com/jngk2/</a> | <a href="#">Mail</a>
    </div>
  `

  const getContent = async (file: Item) => `
    <div class="column-main" >
    ${await getHtml(file)}
    </div>
    `

  for (const file of list) {
    if (isMarkdown(file)) {
      const post = getPost(file)
      const html = fs.readFileSync(templateFile).toString()
        .replace('__CONTENT__', await getContent(file))
        .replace('__SIDEBAR__', (post && post.showSidebar) ? sidebarHtml : '')
        .replace('__TITLE__', post && post.title || '')
        .replace('__FOOTER__', footerHtml);

      const outfile = path.join(outDir, file.name)
        .replace(/\.md$/, '.html')

      await fs.writeFileSync(outfile, html)
    }
  }

  console.timeEnd('build-posts')
}

export { build }
