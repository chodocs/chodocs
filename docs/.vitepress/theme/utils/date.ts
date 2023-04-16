import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export function getDate(date: string | Date | undefined): string | null {
  if (date) {
    const time = dayjs(date instanceof Date ? date : date.trim())
    if (time.isValid()) {
      const currentTime = dayjs(date).utc().local().format('YYYY-MM-DD')
      return currentTime
    }
  }
  return null
}

export function getFromNow(date: string | Date): string | null {
  if (date)
    return dayjs(date).utc().local().fromNow()

  return null
}
