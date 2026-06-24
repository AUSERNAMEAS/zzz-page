import { useEffect, useMemo, useRef, useState } from 'react'
import { useBackgroundMusic } from '../../../audio'

type TrackItem = {
  id: string
  title: string
  folder: string
  audioSrc: string
  imageSrc: string
}

export const MusicToggle = () => {
  const {
    isMusicEnabled,
    toggleMusic,
    currentTrackId,
    currentTrack,
    tracks,
    selectTrack,
    volume,
    setVolume,
  } = useBackgroundMusic()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        menuRef.current?.contains(target) ||
        toggleButtonRef.current?.contains(target)
      ) {
        return
      }

      setIsMenuOpen(false)
    }

    window.addEventListener('mousedown', handleOutsideClick)
    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isMenuOpen])

  const currentItem = useMemo<TrackItem>(() => currentTrack, [currentTrack])

  const handleTrackClick = (track: TrackItem) => {
    if (track.id === currentTrackId) {
      toggleMusic()
      return
    }

    selectTrack(track.id)
    if (!isMusicEnabled) {
      toggleMusic()
    }
  }

  return (
    <div className="relative">
      <button
        ref={toggleButtonRef}
        type="button"
        className="flex h-11 min-w-0 max-w-full items-center gap-2 rounded-xl border-2 border-white/25 bg-zzz-black/80 px-3 text-left overflow-hidden transition duration-200 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-zzz-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-zzz-black sm:max-w-[24rem] lg:max-w-[30rem]"
        aria-expanded={isMenuOpen}
        aria-haspopup="listbox"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {currentItem.imageSrc ? (
          <img
            src={currentItem.imageSrc}
            alt={currentItem.title}
            className="h-8 w-8 rounded-lg object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80">
            ♫
          </span>
        )}

        <span className="flex-1 min-w-0 overflow-hidden text-left text-xs uppercase tracking-[0.18em] text-white/85 leading-5 h-5 zzz-marquee-container">
          <span className="inline-block min-w-full whitespace-nowrap md:animate-none animate-zzz-marquee">
            {currentItem.title}
          </span>
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/80">
          {isMusicEnabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
        </span>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full z-50 mt-2 translate-x-4 w-[min(20rem,calc(100vw-1rem))] max-w-[20rem] overflow-auto rounded-3xl border border-white/10 bg-zzz-black/95 p-4 shadow-xl shadow-black/30"
        >
          <div className="mb-4 flex items-center gap-3">
            {currentItem.imageSrc ? (
              <img
                src={currentItem.imageSrc}
                alt={currentItem.folder}
                className="h-12 w-12 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/80">
                ♫
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{currentItem.title}</p>
              <p className="truncate text-xs uppercase tracking-[0.18em] text-white/50">{currentItem.folder}</p>
            </div>
          </div>

          <div className="space-y-2">
            {tracks.map((track) => {
              const isActive = track.id === currentTrackId && isMusicEnabled
              return (
                <button
                  key={track.id}
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    isActive
                      ? 'border-zzz-yellow ring-2 ring-zzz-yellow/40 bg-zzz-yellow/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10'
                  }`}
                  onClick={() => handleTrackClick(track)}
                  aria-current={track.id === currentTrackId ? 'true' : undefined}
                >
                  <img
                    src={track.imageSrc}
                    alt={track.title}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{track.title}</p>
                    <p className="truncate text-xs text-white/50">{track.folder}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/60">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-zzz-yellow"
              aria-label="Music volume"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const SpeakerOnIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <path
      d="M5 9v6h4l5 4V5L9 9H5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M16 9a4 4 0 010 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18 7a6.5 6.5 0 010 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const SpeakerOffIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <path
      d="M5 9v6h4l5 4V5L9 9H5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M18 9l-6 6M12 9l6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)
