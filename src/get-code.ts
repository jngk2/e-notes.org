import { readFileSync } from "fs";
import path from "path";

const exts: { [key: string]: string } = {
  '.ts': 'typescript',
  '.py': 'python'
}

const getCodeBlock = (filename: string): string => {
  const type = path.extname(filename)
  const code = readFileSync(filename).toString().trim()

  return `\`\`\`${exts[type] || ''}
${code}
\`\`\``;
}

export { getCodeBlock }
