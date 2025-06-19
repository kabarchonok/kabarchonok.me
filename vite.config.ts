import { defineConfig } from 'vite'
import { injectStyles } from './plugins/inject-styles'
import { removeHtmlComments } from './plugins/remove-html-comments'

export default defineConfig({
  plugins: [
    injectStyles(),
    removeHtmlComments(),
  ],

  base: '/',
})
