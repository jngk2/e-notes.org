import React from 'react'
import { render } from 'react-dom'
import { App } from './components/App'

const main = () => {
  if ((document.readyState === 'interactive' && Boolean(document.body)) || document.readyState === 'complete') {
    createApp()
  } else {
    document.addEventListener('DOMContentLoaded', createApp)
  }
}

const createApp = async () => {
  const elem = document.querySelector('[data-app]')


  // @ts-ignore
  // const { data: posts } = await axios.get(API_URL)

  const app = <App />

  render(
    app,
    elem
  )
}

main()
