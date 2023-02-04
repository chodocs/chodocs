import { join, relative, resolve } from 'path'
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
        const doc: ChoDocsTypes = {
          name: docName,
          package: pkg.name,
        }

        const subFolder = await listDocs(join(dir, docName))
        if (subFolder.length) {
          subFolder?.forEach((subName) => {
            const doc: ChoDocsTypes = {
              name: docName,
              package: pkg.name,
            }

            const subMdPath = join(dir, docName, subName, 'index.md')
            if (!fs.existsSync(subMdPath))
              return

            doc.name = `${doc.name}/${subName}`
            indexes.docs.push(doc)
          })
        }
        const mdPath = join(dir, docName, 'index.md')
        if (!fs.existsSync(mdPath)) {
          doc.internal = true
          return
        }
        indexes.docs.push(doc)
      }))
  }

  indexes.docs.sort((a, b) => a.name.localeCompare(b.name))
  return indexes
}

async function run() {
  const indexes = await readMetadata()
  await fs.writeJSON(join(DIR_PACKAGE, 'meta.json'), indexes, { spaces: 2 })
}

run()
