import recursive from "recursive-readdir";
const changed = require('git-changed-files');
import path from "path";
import fs from "fs";
import { generateHtml } from "./generateHtml";

const recurseMarkdown = async (inDir: string, outDir: string) => {
  if (!fs.existsSync(outDir)) {
    await fs.mkdirSync(outDir, { recursive: true })
  }
  console.log(await changed())

  const tPath = path.join(inDir, 'content-full-template.html')

  recursive(inDir, async (_: any, files: string[]) => {
    for (const filePath of files) {
      if (path.extname(filePath) !== '.md') {
        continue;
      }

      const html = await generateHtml(filePath, tPath)
      const outPath = path.resolve(outDir, path.basename(filePath)).replace(/\.md$/, '.html')
      await fs.writeFileSync(outPath, html)
    }
  })
}

export { recurseMarkdown }
