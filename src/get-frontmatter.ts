import { Post } from "./main";

const VALID_ITEMS = [
  'created', 'title', 'tags'
]

const getFrontmatter = (contents: string): Post | null => {
  const fm = contents.match(/^---[\n]((.|\n)*?)[\n]---/)

  if (fm) {
    // @ts-ignore
    return parseFrontmatter(fm[0])
  }

  return null;
}

const stripFrontmatter = (contents: string) => {
  return contents.replace(/^---[\n]((.|\n)*?)[\n]---/, '').trim()
}

const parseFrontmatter = (frontmatter: string) => {
  const lines = frontmatter.split('\n');

  const meta: { [key: string]: any } = {}

  for (const line of lines) {
    if (/^---$/.test(line)) {
      continue
    }

    if (!/\w:/.test(line)) {
      console.error('frontmatter line bad format --', line)
      continue
    }

    const components = line.split(':').map(comp => comp.trim())

    if (components[0] && !VALID_ITEMS.includes(components[0])) {
      console.error(`${components[0]} in frontmatter not supported`)
      continue
    }

    if (!components[1]) {
      console.error(`${components[0]} in frontmatter has no value`)
      continue
    }

    if (components[0]) {
      if (components[0].toLowerCase() === 'tags') {
        meta[components[0]] = JSON.parse(components[1])
      } else {
        meta[components[0]] = components[1]
      }
    }
  }

  return meta
}

export { getFrontmatter, stripFrontmatter, parseFrontmatter }
