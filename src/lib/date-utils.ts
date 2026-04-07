import { format, isSameDay, startOfDay } from 'date-fns'

export const formatDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}

export const isSameDayComparison = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  return isSameDay(d1, d2)
}

export const getStartOfDay = (date: Date): Date => {
  return startOfDay(date)
}
