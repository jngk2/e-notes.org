import path from "path";
import { Item } from "./build-index";

const isMarkdown = (filename: Item) => {
  return path.extname(filename.name) === '.md'
}

export { isMarkdown }
