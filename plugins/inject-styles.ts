import type { HtmlTagDescriptor, Plugin } from 'vite'
import { escapeRegex } from '../utils/escapeRegex'

export function injectStyles(): Plugin {
  return {
    name: 'inject-styles',
    apply: 'build',

    transformIndexHtml: {
      order: 'post',
      handler: (html, ctx) => {
        const tags: HtmlTagDescriptor[] = []
        const bundle = ctx.bundle

        if (!bundle) {
          return []
        }

        Object.values(bundle)
          .filter(output => output.fileName.endsWith('.css'))
          .forEach((output) => {
            if (output.type === 'asset' && typeof output.source === 'string') {
              tags.push({
                tag: 'style',
                children: output.source,
                injectTo: 'head',
              })

              const fileNameRegExp = new RegExp(
                `<link.*href=".*${escapeRegex(output.fileName)}".*\\/?>`,
                'gim',
              )
              html = html.replace(fileNameRegExp, '')
            }

            delete bundle[output.fileName]
          })

        return { html, tags }
      },
    },
  }
}
