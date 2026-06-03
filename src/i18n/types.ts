import en from './locales/en.json'

export type Locale = 'en' | 'es'

export type TranslationKey = Paths<typeof en>

type Paths<T, Prefix extends string = ''> = T extends string
  ? Prefix extends '' ? never : Prefix
  : {
      [K in keyof T & string]: T[K] extends string
        ? Prefix extends ''
          ? K
          : `${Prefix}.${K}`
        : Paths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
    }[keyof T & string]
