import * as op from 'object-path'

import { toast } from 'react-toastify'

import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import isUUID from 'is-uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('pt-br')

// money

export const money = (s?: string | number) => {
  let num = 0

  if (typeof s === 'number') {
    num = s
  } else {
    num = Number(s)
  }

  return (num || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// date

export const date = (
  value: string | number,
  type?: 'digit' | 'long' | 'long-short',
  withHour?: boolean
) => {
  if (value === '') {
    return '-'
  }

  switch (type) {
    case 'long':
      if (withHour) {
        return `${dayjs(value).format('DD, MMMM')} de ${dayjs(value).format(
          'YYYY'
        )} às ${dayjs(value).utcOffset(-3).format('HH:mm')}`
      }
      return `${dayjs(value).format('DD, MMMM')} de ${dayjs(value).format(
        'YYYY'
      )}`

    case 'long-short':
      if (withHour) {
        return `${dayjs(value).format('DD, MMM/YYYY')} às ${dayjs(value)
          .utcOffset(-3)
          .format('HH:mm')}`
      }
      return `${dayjs(value).format('DD, MMM/YYYY')}`

    case 'digit':
      if (withHour) {
        return `${dayjs(value).format('DD/MM/YYYY')} às ${dayjs(value)
          .utcOffset(-3)
          .format('HH:mm')}`
      }
      return dayjs(value).format('DD/MM/YYYY')

    default:
      if (withHour) {
        return `${dayjs(value).format('DD/MM/YYYY')} às ${dayjs(value)
          .utcOffset(-3)
          .format('HH:mm')}`
      }
      return dayjs(value).format('DD/MM/YYYY')
  }
}

// strtonum

export const strtonum = (s?: string | null): number => {
  if (!s) return 0
  return +s.replace(/[^\d,-]/g, '').replace(',', '.') || 0
}

// numtostr

export const numtostr = (n?: number | null): string | undefined => {
  if (!n) return '0'
  return n.toString()
}

// numonly

export const numonly = (s?: string | null) => {
  if (!s) return null
  return s.replace(/[^\d]+/g, '')
}

// generateMongoObjectId

export const generateMongoObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16)
      })
      .toLowerCase()
  )
}

// defaultToastError

export const defaultToastError = (r: any) => {
  const message =
    typeof r.response.data === 'string'
      ? r.response.data
      : r.response.data.message

  toast.error(message || 'Não foi possível executar essa operação')
}

// getFirstLetters

export const getFirstLetters = (value: string) => {
  // const parts = value?.split(' ')

  // const [firstName, lastName] = parts

  return value.slice(0, 2).toUpperCase()
}

// getFirstName

export const getFirstName = (value?: string) => {
  const parts = value?.split(' ')

  const [firstName] = parts || []

  return firstName
}

// makePrismaWhere

export const makePrismaWhere = (
  search: string,
  schema: { OR?: string[]; AND?: string[] }
) => {
  const where = {} as any

  Object.entries(schema).forEach(([operator, keys]) => {
    keys.forEach((key, i) => {
      if (key.toLowerCase().endsWith('id')) {
        if (isUUID.v4(search)) {
          op.set(where, `${operator}.${i}.${key}`, search)
        }
      } else {
        op.set(where, `${operator}.${i}.${key}.contains`, search)
        op.set(where, `${operator}.${i}.${key}.mode`, 'insensitive')
      }
    })
  })

  where.OR = where.OR?.filter(Boolean)
  where.AND = where.AND?.filter(Boolean)

  return where
}
