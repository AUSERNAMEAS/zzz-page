import { useTranslation, type Locale } from '../../../i18n'

const locales: Locale[] = ['en', 'es']

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div
      className="flex items-center gap-1 border border-white/20"
      role="group"
      aria-label={t('language.label')}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-2 py-1 font-display text-xs uppercase transition-colors ${
            locale === code
              ? 'bg-zzz-yellow text-zzz-black'
              : 'text-zzz-yellow hover:bg-zzz-yellow/10'
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
