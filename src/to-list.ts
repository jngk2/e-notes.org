import { TitleFile } from "./build-index";

const PINNED_LIST_ITEM_MAX_CHARS = 10

const toPinnedList = (items: TitleFile[], className?: string): string => {
  return `
<ul class=${className}>
    ${items.map(item => {
      let title = item.title
    
    if (title.length > PINNED_LIST_ITEM_MAX_CHARS) {
      title = title.split(' ')[0] + '...'
    }
    return `<li>
<a href="${item.file}">${title}</a>
</li>`
  }).join('')}    
</ul> `
}

const toList = (items: string[], className?: string): string => {
  return `
<ul class=${className}>
    ${items.map(item => {
    return `<li>
<a>${item}</a>
</li>`
  }).join('')}    
</ul> `
}

export { toList, toPinnedList }
