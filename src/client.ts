import HTML = marked.Tokens.HTML;

const main = () => {
  if ((document.readyState === 'interactive' && Boolean(document.body)) || document.readyState === 'complete') {
    go();
  } else {
    document.addEventListener('DOMContentLoaded', go);
  }
}

const clipCopy = async (event: MouseEvent) => {
  const code = ((event.target as HTMLElement)?.parentNode as HTMLElement)?.nextElementSibling

  if (code && code.textContent) {
    await navigator.clipboard.writeText(code.textContent)
  }
}

const addClipCopy = (node: HTMLElement) => {
  const span = document.createElement('span')
  span.addEventListener('click', clipCopy)
  span.classList.add('copy-to-clip')

  if (node && node.parentNode) {
    (node.parentNode as HTMLElement).classList.add('code-columns')
    node.parentNode.appendChild(span)
  }
}

const go = () => {
  Array.from(document.querySelectorAll('code')).map(addClipCopy)
}

main()
