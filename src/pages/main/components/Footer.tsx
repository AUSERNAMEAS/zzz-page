import { useTranslation } from '../../../i18n'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto border-t border-zzz-yellow/30">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="font-display text-sm font-black uppercase italic tracking-widest text-white/80">
          {t('footer.title')}
        </p>
        <p className="mt-1 text-xs text-white/40">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
