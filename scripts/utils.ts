import { join, resolve } from 'node:path'
import fs from 'fs-extra'
import Git from 'simple-git'
import { $fetch } from 'ohmyfetch'

export const git = Git()

export const DOCS_URL = 'https://chodocs.cn'

export const DIR_ROOT = resolve(__dirname, '..')
export const DIR_SRC = resolve(__dirname, '../docs')

export function replacer(code: string, value: string, key: string, insert: 'head' | 'tail' | 'none' = 'none') {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === 'none')
      return code
    else if (insert === 'head')
      return `${target}\n\n${code}`
    else
      return `${code}\n\n${target}`
  }

  return code.replace(regex, target)
}

export function uniq<T extends any[]>(a: T) {
  return Array.from(new Set(a))
}

async function fetchContributors(page = 1) {
  const additional = ['duoluodexiaoxiaoyuan', 'mengqiuleo', 'isolcat', 'YYHCOPPOLO', 'fyjbts']

  const collaborators: string[] = []
  const data = await $fetch<{ login: string }[]>(`https://api.github.com/repos/chodocs/chodocs/contributors?per_page=100&page=${page}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }) || []
  collaborators.push(...data.map(i => i.login))
  if (data.length === 100)
    collaborators.push(...(await fetchContributors(page + 1)))

  return Array.from(new Set([
    ...collaborators.filter(collaborator => !['renovate[bot]', 'dependabot[bot]', 'renovate-bot', 'github-actions[bot]'].includes(collaborator)),
    ...additional,
  ]))
}

export async function updateContributors() {
  const collaborators = await fetchContributors()
  await fs.writeFile(join(DIR_SRC, './contributors.json'), `${JSON.stringify(collaborators, null, 2)}\n`, 'utf8')
}
