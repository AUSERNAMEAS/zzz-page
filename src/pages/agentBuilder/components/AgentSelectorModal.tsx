import { useEffect } from 'react'
import { useTranslation } from '../../../i18n'
import type { Agent, TeamSlotIndex } from '../types'
import { AgentSelectorCard } from './AgentSelectorCard'

interface AgentSelectorModalProps {
  isOpen: boolean
  activeSlotIndex: TeamSlotIndex | null
  agents: Agent[]
  selectedAgentId: string | null
  hasCurrentAgent: boolean
  onSelectAgent: (agent: Agent) => void
  onClearSlot: () => void
  onClose: () => void
}

export const AgentSelectorModal = ({
  isOpen,
  activeSlotIndex,
  agents,
  selectedAgentId,
  hasCurrentAgent,
  onSelectAgent,
  onClearSlot,
  onClose,
}: AgentSelectorModalProps) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || activeSlotIndex === null) {
    return null
  }

  return (
    <div
      className="zzz-modal-overlay fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-selector-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
        aria-label={t('teamBuilder.closeModal')}
        onClick={onClose}
      />

      <div className="zzz-modal-panel relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2
            id="agent-selector-title"
            className="font-display text-sm font-black uppercase italic tracking-wide text-zzz-white"
          >
            {t('teamBuilder.modalTitle')}
          </h2>
          <button
            type="button"
            className="rounded-lg border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wider text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
            onClick={onClose}
          >
            {t('teamBuilder.closeModal')}
          </button>
        </div>

        <div className="max-h-[min(70vh,32rem)] overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {agents.map((agent) => (
              <AgentSelectorCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgentId === agent.id}
                onSelect={onSelectAgent}
              />
            ))}
          </div>
        </div>

        {hasCurrentAgent && (
          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white/75 transition-all duration-200 hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300"
              onClick={onClearSlot}
            >
              {t('teamBuilder.vacant')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
