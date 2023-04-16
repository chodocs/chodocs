import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { Feed } from 'feed'
import { type SiteConfig, createContentLoader } from 'vitepress'
import { site as baseUrl, description, name } from '../meta'

function reName(name: string) {
  return name === 'Choi Yang' ? 'Chocolate1999' : name
}

function getGithubLink(name: string) {
  return `https://github.com/${reName(name)}`
}

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

  const posts = await createContentLoader('**/*.md', {
    excerpt: true,
    render: true,
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string)
      - +new Date(a.frontmatter.date as string),
  )

  for (const { url, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url.slice(1)}`,
      link: `${baseUrl}${url.slice(1)}`,
      guid: `${baseUrl}${url.slice(1)}`,
      description: html,
      content: html,
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.author
            ? getGithubLink(frontmatter.author)
            : undefined,
        },
      ],
      date: frontmatter?.date || new Date('2021-07-01'),
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
}
