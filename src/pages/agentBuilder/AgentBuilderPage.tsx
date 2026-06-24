import { useEffect } from 'react'
import { useTranslation } from '../../i18n'
import { Footer } from '../main/components/Footer'
import { Navbar } from '../main/components/Navbar'
import { AgentSelectorModal } from './components/AgentSelectorModal'
import { TeamSlot } from './components/TeamSlot'
import { useTeamBuilder } from './useTeamBuilder'

export const AgentBuilderPage = () => {
  const { t } = useTranslation()
  const {
    team,
    activeSlotIndex,
    visibleSlots,
    isTeamFull,
    selectableAgents,
    closeSelector,
    selectAgent,
    clearSlot,
    handleSlotClick,
  } = useTeamBuilder()

  useEffect(() => {
    document.title = t('teamBuilder.meta.title')
  }, [t])

  const hasCurrentAgent = activeSlotIndex !== null && team[activeSlotIndex] !== null
  const selectedAgentId =
    activeSlotIndex !== null && team[activeSlotIndex] !== null
      ? team[activeSlotIndex].id
      : null

  return (
    <div className="flex min-h-dvh flex-col bg-zzz-black">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60 sm:text-base">
            {t('teamBuilder.tagline')}
          </p>
          <h1 className="font-display text-3xl font-black uppercase italic leading-tight tracking-tight text-zzz-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t('teamBuilder.title')}
          </h1>
        </section>

        <section
          className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4 sm:px-6"
          aria-label={t('teamBuilder.slotsAria')}
        >
          <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {visibleSlots.map((slot) => (
              <TeamSlot key={slot.index} slot={slot} onClick={handleSlotClick} />
            ))}
          </div>

          <button
            type="button"
            className="mt-10 w-full max-w-xl bg-[#76E05B] px-6 py-4 font-display text-sm font-black uppercase tracking-wide text-black transition-colors duration-200 hover:bg-[#8ae86f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#76E05B] focus-visible:ring-offset-2 focus-visible:ring-offset-zzz-black disabled:cursor-not-allowed disabled:bg-[#76E05B]/50 disabled:text-black/70 sm:text-base"
            disabled={!isTeamFull}
            aria-disabled={!isTeamFull}
          >
            {isTeamFull ? t('teamBuilder.rateTeam') : t('teamBuilder.lookForTeammate')}
          </button>

          <p className="mt-8 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:text-base">
            {t('teamBuilder.recommendation')}
          </p>
        </section>
      </main>

      <Footer />

      <AgentSelectorModal
        isOpen={activeSlotIndex !== null}
        activeSlotIndex={activeSlotIndex}
        agents={selectableAgents}
        selectedAgentId={selectedAgentId}
        hasCurrentAgent={hasCurrentAgent}
        onSelectAgent={selectAgent}
        onClearSlot={clearSlot}
        onClose={closeSelector}
      />
    </div>
  )
}
