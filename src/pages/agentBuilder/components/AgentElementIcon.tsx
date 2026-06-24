import type { AgentElement } from '../types'

interface AgentElementIconProps {
  element: AgentElement
}

const elementClassName: Record<AgentElement, string> = {
  physical: 'zzz-element-icon--physical',
  fire: 'zzz-element-icon--fire',
  ice: 'zzz-element-icon--ice',
  electric: 'zzz-element-icon--electric',
  ether: 'zzz-element-icon--ether',
}

export const AgentElementIcon = ({ element }: AgentElementIconProps) => (
  <div className={`zzz-element-icon ${elementClassName[element]}`} aria-hidden="true">
    <ElementGlyph element={element} />
  </div>
)

const ElementGlyph = ({ element }: { element: AgentElement }) => {
  switch (element) {
    case 'electric':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 16.8 6.4 19.6 8.5 12.8 3 8.8h6.8L12 2z" />
        </svg>
      )
    case 'physical':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      )
    case 'ether':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M12 3l1.8 5.5h5.8l-4.7 3.4 1.8 5.5L12 14.5 6.3 17.4l1.8-5.5L3.4 8.5h5.8L12 3z" />
          <path d="M7 19l1-2M17 19l-1-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      )
    case 'ice':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      )
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M12 3c0 4-4 5-4 9a4 4 0 108 0c0-4-4-5-4-9z" />
        </svg>
      )
  }
}
