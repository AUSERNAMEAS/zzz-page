import { useTranslation } from '../../../i18n'
import { agentNameKey } from '../agentTranslations'
import type { TeamSlotViewModel } from '../types'
import { AgentElementIcon } from './AgentElementIcon'
import { AgentRankBadge } from './AgentRankBadge'

interface TeamSlotProps {
  slot: TeamSlotViewModel
  onClick: (index: TeamSlotViewModel['index']) => void
}

export const TeamSlot = ({ slot, onClick }: TeamSlotProps) => {
  const { t } = useTranslation()

  if (slot.variant === 'hidden') {
    return null
  }

  if (slot.variant === 'add') {
    return (
      <button
        type="button"
        className="zzz-add-slot group"
        aria-label={t('teamBuilder.addAgent')}
        onClick={() => onClick(slot.index)}
      >
        <span className="zzz-add-slot__icon" aria-hidden="true">
          +
        </span>
      </button>
    )
  }

  const { agent } = slot
  if (agent === null) {
    return null
  }

  const agentName = t(agentNameKey(agent.id))

  return (
    <button
      type="button"
      className="zzz-team-slot group"
      aria-label={t('teamBuilder.agentPortrait', { name: agentName })}
      onClick={() => onClick(slot.index)}
    >
      <div className="zzz-team-slot__portrait">
        <img src={agent.imageSrc} alt="" className="zzz-team-slot__image" />

        <div className="zzz-agent-card__badges">
          <AgentRankBadge rank={agent.rank} />
          <AgentElementIcon element={agent.element} />
        </div>
      </div>

      <span className="zzz-team-slot__name">{agentName}</span>
    </button>
  )
}
