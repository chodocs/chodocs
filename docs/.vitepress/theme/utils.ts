import type { PageInfo } from './types'

export function renderMarkdown(markdownText = '') {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt=\'$1\' src=\'$2\' />')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href=\'$2\'>$1</a>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n$/gim, '<br />')

  return htmlText.trim()
}

export function renderCommitMessage(msg: string) {
  return renderMarkdown(msg)
    .replace(/\#([0-9]+)/g, '<a href=\'https://github.com/Chocolate1999/chodocs/issues/$1\'>#$1</a>')
}

export const getWords = (content: string): RegExpMatchArray | null =>
  // \u00C0-\u024F are Latin Supplement letters, maybe used in language like french
  // \u0400-\u04FF are Cyrillic letters, used in russian
  content.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu)

export const getChinese = (content: string): RegExpMatchArray | null =>
  content.match(/[\u4E00-\u9FD5]/gu)

export const getEnWordCount = (content: string): number =>
  (getWords(content)?.reduce<number>(
    (accumulator, word) =>
      accumulator + (word.trim() === '' ? 0 : word.trim().split(/\s+/u).length),
    0,
  ) || 0)

export const getCnWordCount = (content: string): number =>
  (getChinese(content)?.length || 0)

export const getWordNumber = (content: string): number => getEnWordCount(content) + getCnWordCount(content)

export const getReadingTime = (
  content: string,
  cnWordPerMinute = 350,
  enwordPerMinute = 160,
): PageInfo => {
  const count = getWordNumber(content || '')
  const words = count >= 1000 ? `${Math.round(count / 100) / 10}k` : count

  const enWord = getEnWordCount(content)
  const cnWord = getCnWordCount(content)

  const readingTime = cnWord / cnWordPerMinute + enWord / enwordPerMinute
  const readTime = readingTime < 1 ? '1' : parseInt(`${readingTime}`, 10)

  return {
    readTime,
    words,
  }
}
