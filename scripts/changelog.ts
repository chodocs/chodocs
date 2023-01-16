import Git from 'simple-git'
import type { CommitInfo } from '../docs/.vitepress/metadata';
import { uniq } from './utils'

const git = Git({
  maxConcurrentProcesses: 200,
})
let cache: CommitInfo[] | undefined

export async function getChangeLog(count = 200) {
  if (cache)
    return cache

  const logs = (await git.log({ maxCount: count })).all.filter(i =>
    i.message.includes('chore: release')
    || i.message.includes('!')
    || i.message.startsWith('feat')
    || i.message.startsWith('fix')
    || i.message.startsWith('docs'),
  ) as CommitInfo[]

  for (const log of logs) {
    if (log.message.includes('chore: release')) {
      log.version = log.message.split(' ')[2].trim()
      continue
    }
    const raw = await git.raw(['diff-tree', '--no-commit-id', '--name-only', '-r', log.hash])
    delete log.body
    const files = raw.replace(/\\/g, '/').trim().split('\n')
    log.docs = uniq(
      files
        .map(i => i.match(/^docs\/\w+\/(\w+)\/\w+?\.md$/)?.[1])
        .filter(Boolean),
    )
  }

  const result = logs.filter(i => i.docs?.length || i.version)
  cache = result
  return result
}