import { join, relative, resolve } from 'path'
import matter from 'gray-matter'
import fs from 'fs-extra'
import fg from 'fast-glob'
import Git from 'simple-git'
import { packages } from '../meta/packages'
import type { ChoDocsPackage, ChoDocsTypes, PackageIndexes } from '../types'

export const DOCS_URL = 'https://chodocs.cn'
export const DIR_PACKAGE = resolve(__dirname, '..')
export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(DIR_ROOT, 'docs')

export const git = Git(DIR_ROOT)

export async function listDocs(dir: string, ignore: string[] = []) {
  const files = await fg('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['_*', 'dist', 'node_modules', ...ignore],
  })
  files.sort()
  return files
}

export async function readMetadata() {
  const indexes: PackageIndexes = {
    packages: {},
    categories: [],
    docs: [],
  }

  for (const info of packages) {
    const dir = join(DIR_SRC, info.name)
    const docs = await listDocs(dir)

    const pkg: ChoDocsPackage = {
      ...info,
      name: info.name,
      dir: relative(DIR_ROOT, dir).replace(/\\/g, '/'),
      docs: `${DOCS_URL}/${info.name}/README.html`,
    }

    indexes.packages[info.name] = pkg

    await Promise.all(
      docs?.map(async (docName) => {
        const mdPath = join(dir, docName, 'index.md')
        // const tsPath = join(dir, docName, "index.ts");

        const doc: ChoDocsTypes = {
          name: docName,
          package: pkg.name,
          // lastUpdated:
          //   +(await git.raw(["log", "-1", "--format=%at", tsPath])) * 1000,
        }

        if (fs.existsSync(join(dir, docName, 'component.ts')))
          doc.component = true
        if (fs.existsSync(join(dir, docName, 'directive.ts')))
          doc.directive = true
        if (!fs.existsSync(mdPath)) {
          doc.internal = true
          indexes.docs.push(doc)
          return
        }

        doc.docs = `${DOCS_URL}/${pkg.name}/${docName}/`

        const mdRaw = await fs.readFile(mdPath, 'utf-8')

        const { content: md, data: frontmatter } = matter(mdRaw)
        const category = frontmatter.category

        let alias = frontmatter.alias
        if (typeof alias === 'string') {
          alias = alias
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        }
        let related = frontmatter.related
        if (typeof related === 'string') {
          related = related
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
        }
        else if (Array.isArray(related)) {
          related = related
            .map(s => s.trim())
            .filter(Boolean)
        }

        let description
          = (md
            .replace(/\r\n/g, '\n')
            .match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || ''

        description = description.trim()
        description = description.charAt(0).toLowerCase() + description.slice(1)

        doc.category = ['core', 'shared'].includes(pkg.name)
          ? category
          : `@${pkg.display}`
        doc.description = description

        if (description.includes('DEPRECATED') || frontmatter.deprecated)
          doc.deprecated = true

        if (alias?.length)
          doc.alias = alias

        if (related?.length)
          doc.related = related

        if (pkg.submodules)
          doc.importPath = `${pkg.name}/${doc.name}`

        indexes.docs.push(doc)
      }))
  }

  indexes.docs.sort((a, b) => a.name.localeCompare(b.name))

  // interop related
  indexes.docs.forEach((doc) => {
    if (!doc.related)
      return

    doc.related.forEach((name) => {
      const target = indexes.docs.find(f => f.name === name)
      if (!target)
        throw new Error(`Unknown related function: ${name}`)
      if (!target.related)
        target.related = []
      if (!target.related.includes(doc.name))
        target.related.push(doc.name)
    })
  })
  indexes.docs.forEach(doc => doc.related?.sort())

  return indexes
}

async function run() {
  const indexes = await readMetadata()
  await fs.writeJSON(join(DIR_PACKAGE, 'meta.json'), indexes, { spaces: 2 })
}

run()
