import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { Feed } from 'feed'
import { type SiteConfig, createContentLoader } from 'vitepress'
import { site as baseUrl, description, name } from '../meta'

const reName = (name: string) => name === 'Choi Yang' ? 'Chocolate1999' : name

const getGithubLink = (name: string) => `https://github.com/${reName(name)}`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: name,
    description,
    id: baseUrl,
    link: baseUrl,
    language: 'zh-CN',
    image: 'https://chodocs.cn/chodocs-logo.svg',
    favicon: `${baseUrl}/favicon.ico`,
    copyright:
      'Copyright (c) 2022-present, Chocolate and ChoDocs contributors',
  })

  const posts = await createContentLoader('*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string)
      - +new Date(a.frontmatter.date as string),
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.author
            ? getGithubLink(frontmatter.author)
            : undefined,
        },
      ],
      date: frontmatter.date,
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
}
