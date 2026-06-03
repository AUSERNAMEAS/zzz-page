import { actionOptions } from '../../../data/actionOptions'
import { useTranslation } from '../../../i18n'
import { ActionCard } from './ActionCard'

export function ActionGrid() {
  const { t } = useTranslation()

  return (
    <section
      className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20"
      aria-labelledby="action-grid-heading"
    >
      <h2 id="action-grid-heading" className="sr-only">
        {t('actions.gridAria')}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {actionOptions.map((option, index) => (
          <ActionCard key={option.id} option={option} index={index} />
        ))}
      </div>
    </section>
  )
}
