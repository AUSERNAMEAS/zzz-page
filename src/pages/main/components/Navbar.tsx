import { useEffect, useState } from 'react'
import { actionOptions } from '../../../data/actionOptions'
import { actionTextKey } from '../../../i18n/actionTranslations'
import { useTranslation } from '../../../i18n'
import zzzLogo from '../../../assets/appImages/zzzLogo.webp'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MusicToggle } from './MusicToggle'

export function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-60 border-b border-white/10 bg-zzz-black/90 backdrop-blur-sm">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
          aria-label={t('nav.mainAria')}
        >
          <picture>
            <source srcSet={zzzLogo} type="image/webp" />
            <img src={zzzLogo} alt={t('nav.logoAlt')} className="h-10 w-10" />
          </picture>

          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className="flex-1 min-w-0">
              <MusicToggle />
            </div>
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-none border-2 border-zzz-yellow bg-zzz-black text-zzz-yellow transition-colors duration-200 hover:bg-zzz-yellow/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zzz-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-zzz-black"
              aria-expanded={isMenuOpen}
              aria-controls="zzz-menu-overlay"
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">
                {isMenuOpen ? t('nav.screenReaderClose') : t('nav.screenReaderMenu')}
              </span>
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`block h-0.5 w-5 bg-zzz-yellow transition-all duration-300 ${
                    isMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-zzz-yellow transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-zzz-yellow transition-all duration-300 ${
                    isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="zzz-menu-overlay"
        className={`fixed inset-0 z-40 flex justify-end transition-opacity duration-300 ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        aria-label={t('nav.menuDialogAria')}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/80"
          aria-label={t('nav.closeOverlayAria')}
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <aside
          className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[20rem] flex-col border-0 border-l-2 border-zzz-yellow bg-zzz-black transition-transform duration-300 ease-out sm:max-w-md sm:border-l-2 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-zzz-yellow/30 px-6 py-5">
            <p className="font-display text-sm font-black uppercase italic text-zzz-yellow">
              {t('nav.menu')}
            </p>
            <button
              type="button"
              className="border border-zzz-yellow/60 px-3 py-1 font-display text-xs uppercase italic text-zzz-yellow transition-colors hover:border-zzz-yellow hover:bg-zzz-yellow/10"
              onClick={closeMenu}
            >
              {t('nav.close')}
            </button>
          </div>

          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-5">
            <li>
              <a
                href="#"
                className="block border border-zzz-yellow/40 bg-zzz-yellow/10 px-4 py-4 transition-colors hover:border-zzz-yellow hover:bg-zzz-yellow/20"
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault()
                  window.location.hash = ''
                  closeMenu()
                }}
              >
                <span className="mb-1 block font-display text-xs uppercase tracking-widest text-zzz-yellow">
                  {t('nav.homeLabel')}
                </span>
                <span className="font-display text-lg font-black uppercase italic text-zzz-white">
                  {t('nav.home')}
                </span>
                <span className="mt-1 block text-sm text-white/60">{t('nav.homeDescription')}</span>
              </a>
            </li>

            {actionOptions.map((option, index) => (
              <li key={option.id}>
                <a
                  href={option.href}
                  className="block border border-white/15 bg-white/5 px-4 py-4 transition-colors hover:border-zzz-yellow hover:bg-zzz-yellow/10"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={closeMenu}
                >
                  <span className="mb-1 block font-display text-xs uppercase tracking-widest text-zzz-yellow/70">
                    0{index + 1}
                  </span>
                  <span className="font-display text-lg font-black uppercase italic text-zzz-white">
                    {t(actionTextKey(option.id, 'title'))}
                  </span>
                  <span className="mt-1 block text-sm text-white/60">
                    {t(actionTextKey(option.id, 'description'))}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-zzz-yellow/20 px-6 py-4">
            <p className="text-xs uppercase tracking-widest text-white/40">{t('brand.name')}</p>
          </div>
        </aside>
      </div>
    </>
  )
}
