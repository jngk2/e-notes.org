import path from "path"
import { recurseMarkdown } from "./functions/recurseMarkdown";

const OUT_DIR = path.resolve(__dirname, '..', 'build')
const HTML_DIR = path.join(OUT_DIR, 'html')
const MD_DIR = path.resolve(__dirname, '..', 'src', 'content')

const main = async () => {
  console.time('build-posts')
  recurseMarkdown(MD_DIR, HTML_DIR)
  console.timeEnd('build-posts')
  // buildMetaFile(MD_DIR, OUT_DIR)
}

main();
