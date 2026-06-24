import { useCallback, useMemo, useState } from 'react'
import { availableAgents } from './agents'
import type { Agent, Team, TeamSlotIndex, TeamSlotViewModel } from './types'

const EMPTY_TEAM: Team = [null, null, null]

const isTeamSlotIndex = (value: number): value is TeamSlotIndex =>
  value === 0 || value === 1 || value === 2

export const useTeamBuilder = () => {
  const [team, setTeam] = useState<Team>(EMPTY_TEAM)
  const [activeSlotIndex, setActiveSlotIndex] = useState<TeamSlotIndex | null>(null)

  const firstEmptyIndex = team.findIndex((slot) => slot === null)
  const filledCount = team.filter((slot) => slot !== null).length
  const isTeamFull = filledCount === 3

  const slotViewModels = useMemo((): TeamSlotViewModel[] => {
    return team.map((agent, index) => {
      if (agent !== null) {
        return { index: index as TeamSlotIndex, agent, variant: 'filled' as const }
      }

      if (index === firstEmptyIndex) {
        return { index: index as TeamSlotIndex, agent: null, variant: 'add' as const }
      }

      return { index: index as TeamSlotIndex, agent: null, variant: 'hidden' as const }
    })
  }, [team, firstEmptyIndex])

  const visibleSlots = useMemo(
    () => slotViewModels.filter((slot) => slot.variant !== 'hidden'),
    [slotViewModels],
  )

  const openSelector = useCallback((index: TeamSlotIndex) => {
    setActiveSlotIndex(index)
  }, [])

  const closeSelector = useCallback(() => {
    setActiveSlotIndex(null)
  }, [])

  const selectAgent = useCallback(
    (agent: Agent) => {
      if (activeSlotIndex === null) return

      setTeam((previousTeam) => {
        const nextTeam: Team = [...previousTeam]
        nextTeam[activeSlotIndex] = agent
        return nextTeam
      })
      setActiveSlotIndex(null)
    },
    [activeSlotIndex],
  )

  const clearSlot = useCallback(() => {
    if (activeSlotIndex === null) return

    setTeam((previousTeam) => {
      const nextTeam: Team = [...previousTeam]
      nextTeam[activeSlotIndex] = null
      return nextTeam
    })
    setActiveSlotIndex(null)
  }, [activeSlotIndex])

  const selectableAgents = useMemo(() => {
    if (activeSlotIndex === null) return []

    const takenAgentIds = new Set(
      team
        .map((agent, index) => (index === activeSlotIndex ? null : agent))
        .filter((agent): agent is Agent => agent !== null)
        .map((agent) => agent.id),
    )

    return availableAgents.filter((agent) => !takenAgentIds.has(agent.id))
  }, [team, activeSlotIndex])

  const handleSlotClick = useCallback(
    (index: number) => {
      if (!isTeamSlotIndex(index)) return

      const slot = slotViewModels[index]
      if (slot.variant === 'hidden') return

      openSelector(index)
    },
    [openSelector, slotViewModels],
  )

  return {
    team,
    activeSlotIndex,
    visibleSlots,
    isTeamFull,
    filledCount,
    selectableAgents,
    openSelector,
    closeSelector,
    selectAgent,
    clearSlot,
    handleSlotClick,
  }
}
