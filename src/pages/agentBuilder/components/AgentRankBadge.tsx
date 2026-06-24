import type { AgentRank } from '../types'

interface AgentRankBadgeProps {
  rank: AgentRank
}

export const AgentRankBadge = ({ rank }: AgentRankBadgeProps) => (
  <div className="zzz-rank-badge" aria-hidden="true">
    <span className="zzz-rank-badge__label">{rank}</span>
  </div>
)
