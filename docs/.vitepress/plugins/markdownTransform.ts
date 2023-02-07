import type { Plugin } from 'vite'
import { replacer } from '../../../scripts/utils'

export function MarkdownTransform(): Plugin {
  return {
    name: 'chodocs-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/))
        return null
      // convert links to relative
      code = code.replace(/https?:\/\/chodocs\.cn\//g, '/')
      const [_name, i] = id.split('/').slice(-2)

      // cut index.md
      if (_name === 'docs' && i === 'index.md')
        return code

      const { footer } = await getDocsMarkdown()
      code = replacer(code, footer, 'FOOTER', 'tail')
      return code
    },
  }
}

export async function getDocsMarkdown() {
  const ContributorsSection = `## Contributors
  <Contributors/>`

  const footer = `${ContributorsSection}\n`

  return {
    footer,
  }
}
