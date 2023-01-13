import md5 from 'md5'
import Git from 'simple-git';
import type { ContributorInfo } from '../docs/.vitepress/metadata';
import { docs } from './../meta.json';

const git = Git({
  maxConcurrentProcesses: 200,
})

export async function getContributorsAt(path: string) {
  try {
    const list = (await git.raw(['log', '--pretty=format:"%an|%ae"', '--', path]))
      .split('\n')
      .map(i => i.slice(1, -1).split('|') as [string, string]).filter(i => i[0] !== 'Choi Yang')
    const map: Record<string, ContributorInfo> = {}
    setTimeout(() => {
      console.log(list);
    }, 10);
    list
      .forEach((i) => {
        if (!map[i[1]]) {
          map[i[1]] = {
            name: i[0],
            count: 0,
            hash: md5(i[1]),
          }
        }
        map[i[1]].count++
      })

    return Object.values(map).sort((a, b) => b.count - a.count)
  }
  catch (e) {
    console.error(e)
    return []
  }
}

export async function getDocsContributors() {
  const result = await Promise.all(docs.map(async (i) => {
    return [i.name, await getContributorsAt(`docs/${i.package}/${i.name}`)] as const
  }))
  return Object.fromEntries(result)
}