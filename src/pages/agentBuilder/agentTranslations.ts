import type { TranslationKey } from '../../i18n/types'
import type { Agent } from './types'

export const agentNameKey = (agentId: Agent['id']): TranslationKey =>
  `teamBuilder.agents.${agentId}` as TranslationKey
