import fs from "fs";
import { Post } from "./main";

const getIndex = (): string => {
  const index = JSON.parse(fs.readFileSync('./build/index.json').toString())


  return `
    <ul class="index">
      ${index.posts.map((post: Post) => {

    const classes = `${post.pinned ? 'pinned' : ''}`

    return `<li>
                <a class="${classes}" href=${post.file}>
  <span class="post-name">    
${post.title}
</span>
</a>
                <span class="created">${post.created}</span>
            </li>`
  }).join('')}
    </ul>
`.trim();
}

export { getIndex }
