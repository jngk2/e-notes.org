import fs from "fs";
import { Item } from "./build-index";
import { getFrontmatter } from "./get-frontmatter";

const getPost = (item: Item) => {
  const contents = fs.readFileSync(item.fullname).toString()
  const fm = getFrontmatter(contents)

  if (!fm) return null

  return {
    title: fm.title,
    file: item.name === 'index.md' ? '/' : item.name.replace('.md', ''),
    tags: fm.tags,
    created: fm.created,
    updated: fm.updated || '',
    pinned: Boolean(fm.pinned),
  }
}

export { getPost }
