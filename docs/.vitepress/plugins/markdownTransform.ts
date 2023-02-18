import type { Plugin } from 'vite'
import { replacer } from '../../../scripts/utils'
import { getReadingTime } from './../theme/utils'

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
      const { readTime, words } = getReadingTime(code)
      code = code
        .replace(/(#\s.+?\n)/, `$1\n\n<PageInfo readTime="${readTime}" words="${words}"/>\n`)

      return code
    },
  }
}

export async function getDocsMarkdown() {
  const ContributorsSection = `## Contributors
  <Contributors/>`

  const CopyRightSection = `
  <CopyRight/>`

  const footer = `${ContributorsSection}\n${CopyRightSection}\n`

  return {
    footer,
  }
}
