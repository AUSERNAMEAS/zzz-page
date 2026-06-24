export type AgentRank = 'S' | 'A' | 'B'

export type AgentElement = 'physical' | 'fire' | 'ice' | 'electric' | 'ether'

export interface Agent {
  id: string
  imageSrc: string
  rank: AgentRank
  element: AgentElement
}

export type Team = [Agent | null, Agent | null, Agent | null]

export type TeamSlotIndex = 0 | 1 | 2

export interface TeamSlotViewModel {
  index: TeamSlotIndex
  agent: Agent | null
  variant: 'filled' | 'add' | 'hidden'
}
