import { useTranslation } from '../../../i18n'

export function HeroText() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60 sm:text-base">
        {t('hero.tagline')}
      </p>
      <h1 className="font-display text-3xl font-black uppercase italic leading-tight tracking-tight text-zzz-white sm:text-4xl md:text-5xl lg:text-6xl">
        {t('hero.title')}
      </h1>
      <div className="mx-auto mt-6 h-1 w-24 bg-zzz-yellow" aria-hidden="true" />
    </section>
  )
}
