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

interface Tags {
  [key: string]: number
}

const incrementTags = (counts: Tags, tags: string[]) => {
  for (const tag of tags) {
    if (tag in counts) {
      counts[tag]++;
    } else {
      counts[tag] = 1;
    }
  }
}

const build = async (dir: string, outDir: string) => {
  console.time('build-index')

  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }

  const tags: Tags = {}
  const posts: Post[] = []
  const pinned: string[] = []

  const list = (await rra.list(dir) as Item[])

  for (const item of list) {
    if (isMarkdown(item)) {
      const post = getPost(item)

      if (post) {
        if (post.pinned) {
          pinned.push(post.title)
        }

        if (post.tags) {
          incrementTags(tags, post.tags)
        }

        posts.push(post)
      }
    }
  }

  fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify({
    posts,
    tags,
    pinned
  }))

  console.timeEnd('build-index')
}

export { build, Item }
