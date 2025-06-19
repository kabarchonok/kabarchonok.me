import type { HtmlTagDescriptor, Plugin } from 'vite'

export function removeHtmlComments(): Plugin {
  return {
    name: 'remove-html-comments',
    apply: 'build',

    transformIndexHtml: {
      order: 'post',
      handler: (html) => {
        const tags: HtmlTagDescriptor[] = []

        html = html.replace(/<!--(.*?)-->/g, '')

        return { html, tags }
      },
    },
  }
}
