import path from "path"
import { build as buildPosts } from "./build-posts";
import { build as buildIndex } from "./build-index";

const OUT_DIR = path.resolve(__dirname, '..', 'build')
const HTML_DIR = path.join(OUT_DIR, 'html')
const MD_DIR = path.resolve(__dirname, '..', 'content')

interface Post {
  title: string
  file: string
  tags: string[]
  created: string
}

const run = async () => {
  console.time('build-all')
  await buildIndex(MD_DIR, OUT_DIR)
  await buildPosts(MD_DIR, HTML_DIR)
  console.timeEnd('build-all')
}

run();

export { Post }
