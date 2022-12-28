import * as op from 'object-path'

import { toast } from '@luma/ui'

import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import isUUID from 'is-uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'

export * from './validators'

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
      : typeof r.response.data?.message === 'string'
      ? r.response.data?.message
      : 'Não foi possível executar essa operação'

  toast.error(message)
}

export const getFirstLetters = (value: string) => {
  // const parts = value?.split(' ')

  // const [firstName, lastName] = parts

  return value.slice(0, 2).toUpperCase()
}

export const getFirstName = (value?: string) => {
  const parts = value?.split(' ')

  const [firstName] = parts || []

  return firstName
}

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

/**
 * This function concatenates classnames
 */

export const dedupTailwind = (str: string) => {
  const nonCollidable = ['border-', 'rounded-']
  const speciallyCollidable: Record<string, string[]> = {
    'px-': ['p-'],
    'py-': ['p-'],
    'p-': ['py-', 'px-'],
    flex: ['block'],
    block: ['flex'],
  }

  return str
    .split(/\s+/)
    .filter((v, i, arr) => {
      const makePrefix = (str: string) => {
        const split = str.split('-')
        return split.length > 1 ? `${split.slice(0, -1).join('-')}-` : split[0]
      }
      const prefix = makePrefix(v)
      return (
        nonCollidable.includes(prefix) ||
        !arr
          .slice(i)
          .find(
            (vv) =>
              [prefix, ...(speciallyCollidable[prefix] || [])].includes(
                makePrefix(vv)
              ) && vv !== v
          )
      )
    })
    .join(' ')
}

export const c = (...arr: (string | undefined | null | false)[]) => {
  const classes = dedupTailwind(
    arr
      // eslint-disable-next-line no-extra-boolean-cast
      .flatMap((s) => (!!s ? s.split(/\s+/) : []))
      .filter((s) => !!s && s !== 'undefined')
      .join(' ')
  )

  return classes.length < 1 ? undefined : classes
}

// px2num

export const px2num = (px: string) => {
  return parseFloat(`${px}`.replace('px', ''))
}

// convertPXToREM

export const FONT_BASE = 16

export const convertPXToREM = (px: string) => {
  return `${px2num(px) / FONT_BASE}rem`
}

// randonfy

export const randonfy = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// generateArrayOfNumbers

export const generateArrayOfNumbers = (from: number, to: number) => {
  const array: number[] = []

  for (let i = from; i < to; i++) {
    array.push(i)
  }

  return array
}
