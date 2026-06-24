import anbyPortrait from '../../assets/agents image/Cunning Hares/Agent_Anby_Demara_Portrait.webp'
import billyPortrait from '../../assets/agents image/Cunning Hares/Agent_Billy_Kid_Portrait.webp'
import nekomiyaPortrait from '../../assets/agents image/Cunning Hares/Agent_Nekomiya_Mana_Portrait.webp'
import nicolePortrait from '../../assets/agents image/Cunning Hares/Agent_Nicole_Demara_Portrait.webp'
import yeShunguangPortrait from '../../assets/agents image/yeShunguang.webp'
import type { Agent } from './types'

export const availableAgents: Agent[] = [
  { id: 'anby', imageSrc: anbyPortrait, rank: 'S', element: 'electric' },
  { id: 'billy', imageSrc: billyPortrait, rank: 'S', element: 'physical' },
  { id: 'nekomiya', imageSrc: nekomiyaPortrait, rank: 'S', element: 'physical' },
  { id: 'nicole', imageSrc: nicolePortrait, rank: 'S', element: 'ether' },
  { id: 'yeShunguang', imageSrc: yeShunguangPortrait, rank: 'S', element: 'ice' },
]
