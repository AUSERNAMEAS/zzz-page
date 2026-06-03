import { actionTextKey } from '../../../i18n/actionTranslations'
import { useTranslation } from '../../../i18n'
import type { ActionOption } from '../../../types/action'

interface ActionCardProps {
  option: ActionOption
  index: number
}

export function ActionCard({ option, index }: ActionCardProps) {
  const { t } = useTranslation()

  return (
    <a
      href={option.href}
      className="group block border border-white/20 bg-white/5 p-5 transition-colors duration-200 hover:border-zzz-yellow sm:p-6"
    >
      <span className="mb-2 block font-display text-xs uppercase tracking-widest text-zzz-yellow">
        0{index + 1}
      </span>
      <h2 className="font-display text-xl font-black uppercase italic text-zzz-white transition-colors group-hover:text-zzz-yellow sm:text-2xl">
        {t(actionTextKey(option.id, 'title'))}
      </h2>
      <p className="mt-2 text-sm text-white/70 sm:text-base">
        {t(actionTextKey(option.id, 'description'))}
      </p>
      <span className="sr-only">{t(actionTextKey(option.id, 'imageAlt'))}</span>
    </a>
  )
}
