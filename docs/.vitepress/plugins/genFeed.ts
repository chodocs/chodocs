import type { SiteConfig } from 'vitepress'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { site as baseUrl, description, name } from '../meta'

function removeZeroWidthSpace(str: string): string {
  return str
    .replaceAll('\u200B', '')
    .replaceAll('&ZeroWidthSpace;', '')
    .replaceAll('&#8203;', '')
    .replaceAll('&#x200B;', '')
}

function cleanHtml(html: string | undefined, baseUrl: string): string {
  if (!html)
    return ''

  let cleanedHtml = html

  cleanedHtml = removeZeroWidthSpace(cleanedHtml)
  cleanedHtml = cleanedHtml.replace(/<a class="header-anchor"[^>]*>.*?<\/a>/g, '')
  cleanedHtml = cleanedHtml.replace(/<h1[^>]*>.*?<\/h1>/i, '')

  // Convert relative image paths to absolute URLs
  cleanedHtml = cleanedHtml.replace(
    /<img([^>]*?)src="\/([^"]+)"/g,
    `<img$1src="${baseUrl}/$2"`,
  )

  cleanedHtml = cleanedHtml.replace(
    /<img([^>]*?)src="\.\.\/([^"]+)"/g,
    (_, attrs, src) => `<img${attrs}src="${baseUrl}/${src}"`,
  )

  cleanedHtml = cleanedHtml.replace(
    /<img([^>]*?)src="\.\/([^"]+)"/g,
    (_, attrs, src) => `<img${attrs}src="${baseUrl}/${src}"`,
  )

  return cleanedHtml.trim()
}

function extractDescription(
  frontmatter: any,
  excerpt: string | undefined,
  html: string | undefined,
): string {
  if (frontmatter?.description)
    return removeZeroWidthSpace(frontmatter.description)

  if (excerpt) {
    const cleanExcerpt = excerpt
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
    return removeZeroWidthSpace(cleanExcerpt).trim()
  }

  if (html) {
    const text = html
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    return removeZeroWidthSpace(text).substring(0, 200)
  }

  return ''
}

function extractTitle(frontmatter: any, html: string | undefined): string {
  if (frontmatter?.title)
    return removeZeroWidthSpace(frontmatter.title)

  if (html) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i)
    if (h1Match) {
      const title = h1Match[1]
        .replace(/<[^>]+>/g, '')
        .trim()
      return removeZeroWidthSpace(title)
    }
  }

  return 'Untitled'
}

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: name,
    description,
    id: baseUrl,
    link: baseUrl,
    language: 'zh-CN',
    image: `${baseUrl}/chodocs-logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: 'Copyright (c) 2022-present, Chocolate and ChoDocs contributors',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      atom: `${baseUrl}/feed.atom`,
      json: `${baseUrl}/feed.json`,
    },
    author: {
      name: 'Choi Yang',
      email: 'ycychocolate@163.com',
      link: 'https://github.com/Chocolate1999',
    },
  })

  const posts = await createContentLoader('**/*.md', {
    excerpt: true,
    render: true,
  }).load()

  const sortedPosts = posts
    .filter((post) => {
      const { frontmatter, url } = post

      if (!frontmatter?.date)
        return false

      const excludePatterns = [
        '/index',
        '/contributing',
        '/2022',
        '/favorites',
      ]

      if (excludePatterns.some(pattern => url.includes(pattern)))
        return false

      if (frontmatter.publish === false)
        return false

      return true
    })
    .sort((a, b) => {
      const dateA = +new Date(a.frontmatter.date)
      const dateB = +new Date(b.frontmatter.date)
      return dateB - dateA
    })
    .slice(0, 50)

  for (const { url, frontmatter, html, excerpt } of sortedPosts) {
    const title = extractTitle(frontmatter, html)
    const description = extractDescription(frontmatter, excerpt, html)
    const content = cleanHtml(html, baseUrl)

    const authorName = frontmatter?.author || 'Choi Yang'
    const authorLink = authorName === 'Choi Yang'
      ? 'https://github.com/Chocolate1999'
      : undefined

    const categories = frontmatter?.tags
      ? (Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags])
          .map((tag: string) => ({ name: tag }))
      : []

    let imageUrl: string | undefined
    if (frontmatter?.cover) {
      imageUrl = frontmatter.cover.startsWith('http')
        ? frontmatter.cover
        : `${baseUrl}${frontmatter.cover.startsWith('/') ? '' : '/'}${frontmatter.cover}`
    }

    feed.addItem({
      title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description,
      content,
      author: [
        {
          name: authorName,
          link: authorLink,
        },
      ],
      date: new Date(frontmatter.date),
      category: categories,
      image: imageUrl,
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
  writeFileSync(path.join(config.outDir, 'feed.atom'), feed.atom1())
  writeFileSync(path.join(config.outDir, 'feed.json'), feed.json1())

  // eslint-disable-next-line no-console
  console.log(`✓ RSS feed generated: ${sortedPosts.length} posts`)
}
