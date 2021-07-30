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

export { toList }
