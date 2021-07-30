import fs from "fs";
import { Post } from "./main";

const getIndex = (): string => {
  const index = JSON.parse(fs.readFileSync('./build/index.json').toString())

  return `
    <ul class="index">
      ${index.posts.map((post: Post) => {
    return `<li><a href=${post.file}>${post.title}</a>
<span class="created">${post.created}</span>
</li>`
  }).join('')}
    </ul>
`.trim();
}

export { getIndex }
