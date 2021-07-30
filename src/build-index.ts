import { isMarkdown } from "./util";
import fs from "fs";
import path from "path";
import { Post } from "./main";
import { getPost } from "./get-post";

const rra = require('recursive-readdir-async')

interface Item {
  name: string,
  fullname: string
}

const build = async (dir: string, outDir: string) => {
  console.time('build-index')

  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }

  const posts: Post[] = []

  const list = (await rra.list(dir) as Item[])

  for (const item of list) {
    if (isMarkdown(item)) {
      const post = getPost(item)
      if (post) {
        posts.push(post)
      }
    }
  }

  fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify({
    posts
  }))

  console.timeEnd('build-index')
}

export { build, Item }
