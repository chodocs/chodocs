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

      // convert img
      const imgRegex = /!\[(.+?)\]\((.+?)\)/g
      let imgMatches = imgRegex.exec(code)
      while (imgMatches) {
        const [text, link] = imgMatches.slice(1)
        code = code.replace(imgMatches[0], `<img src="${link}" alt="${text || 'img'}" />`)
        imgMatches = imgRegex.exec(code)
      }

      // convert links to components
      const linkRegex = /\[(.+?)\]\((.+?)\)/g
      let matches = linkRegex.exec(code)
      while (matches) {
        const [text, link] = matches.slice(1)
        code = code.replace(matches[0], `<CustomLink title="${text}" href="${link}" />`)
        matches = linkRegex.exec(code)
      }

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
