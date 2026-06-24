import { useTranslation } from '../../../i18n'
import { agentNameKey } from '../agentTranslations'
import type { Agent } from '../types'
import { AgentElementIcon } from './AgentElementIcon'
import { AgentRankBadge } from './AgentRankBadge'

interface AgentSelectorCardProps {
  agent: Agent
  isSelected: boolean
  onSelect: (agent: Agent) => void
}

export const AgentSelectorCard = ({ agent, isSelected, onSelect }: AgentSelectorCardProps) => {
  const { t } = useTranslation()
  const agentName = t(agentNameKey(agent.id))

  return (
    <button
      type="button"
      className="zzz-agent-card group"
      aria-label={agentName}
      aria-pressed={isSelected}
      onClick={() => onSelect(agent)}
    >
      <div className="zzz-agent-card__portrait">
        <img src={agent.imageSrc} alt="" className="zzz-agent-card__image" />

        <div className="zzz-agent-card__badges">
          <AgentRankBadge rank={agent.rank} />
          <AgentElementIcon element={agent.element} />
        </div>

        <div className={`zzz-agent-card__check ${isSelected ? 'zzz-agent-card__check--visible' : ''}`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span className="zzz-agent-card__name">{agentName}</span>
    </button>
  )
}
