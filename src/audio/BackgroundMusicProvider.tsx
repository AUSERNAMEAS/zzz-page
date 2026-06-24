import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY_ENABLED = 'zzz-music-enabled'
const STORAGE_KEY_TRACK = 'zzz-current-music-track'
const STORAGE_KEY_VOLUME = 'zzz-music-volume'

type MusicTrack = {
  id: string
  title: string
  folder: string
  audioSrc: string
  imageSrc: string
}

const rawMusicAssets = import.meta.glob('../assets/music/*/*.{mp3,jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const musicTracks: MusicTrack[] = (() => {
  const folderImageMap = new Map<string, string>()
  const audioEntries: Array<{ folder: string; title: string; audioSrc: string }> = []

  for (const [assetPath, assetUrl] of Object.entries(rawMusicAssets)) {
    const segments = assetPath.split('/')
    const folder = segments[3] ?? 'Unknown'
    const filename = segments[4] ?? ''
    if (filename.match(/\.(jpe?g|png|webp)$/i)) {
      folderImageMap.set(folder, assetUrl)
      continue
    }

    if (filename.toLowerCase().endsWith('.mp3')) {
      const title = filename.replace(/\.mp3$/i, '')
      audioEntries.push({ folder, title, audioSrc: assetUrl })
    }
  }

  return audioEntries.map(({ folder, title, audioSrc }) => ({
    id: `${folder}|${title}`,
    title,
    folder,
    audioSrc,
    imageSrc: folderImageMap.get(folder) ?? '',
  }))
})()

interface BackgroundMusicContextValue {
  isMusicEnabled: boolean
  toggleMusic: () => void
  currentTrackId: string
  currentTrack: MusicTrack
  tracks: MusicTrack[]
  selectTrack: (trackId: string) => void
  volume: number
  setVolume: (value: number) => void
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null)

const getInitialMusicEnabled = (): boolean => {
  const saved = localStorage.getItem(STORAGE_KEY_ENABLED)
  return saved !== 'false'
}

const getInitialTrackId = (): string => {
  const savedId = localStorage.getItem(STORAGE_KEY_TRACK)
  if (savedId && musicTracks.some((track) => track.id === savedId)) {
    return savedId
  }
  return musicTracks[0]?.id ?? ''
}

const getInitialVolume = (): number => {
  const saved = localStorage.getItem(STORAGE_KEY_VOLUME)
  const parsed = Number(saved)
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0.35
}

export const BackgroundMusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMusicEnabled, setIsMusicEnabled] = useState(getInitialMusicEnabled)
  const [currentTrackId, setCurrentTrackId] = useState(getInitialTrackId)
  const [volume, setVolumeState] = useState(getInitialVolume)

  const currentTrack = useMemo(
    () => musicTracks.find((track) => track.id === currentTrackId) ?? musicTracks[0],
    [currentTrackId],
  )

  const playMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await audio.play()
    } catch {
      // Browser may block autoplay until a user interacts with the page.
    }
  }, [])

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggleMusic = useCallback(() => {
    setIsMusicEnabled((enabled) => !enabled)
  }, [])

  const selectTrack = useCallback((trackId: string) => {
    setCurrentTrackId(trackId)
  }, [])

  const setVolume = useCallback((value: number) => {
    setVolumeState(value)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ENABLED, String(isMusicEnabled))
  }, [isMusicEnabled])

  useEffect(() => {
    if (!currentTrack.id) return
    localStorage.setItem(STORAGE_KEY_TRACK, currentTrack.id)
  }, [currentTrack.id])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VOLUME, String(volume))
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentTrack.audioSrc
    audio.load()

    if (isMusicEnabled) {
      void playMusic()
    }
  }, [currentTrack.audioSrc, isMusicEnabled, playMusic])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isMusicEnabled) {
      void playMusic()
    } else {
      pauseMusic()
    }
  }, [isMusicEnabled, playMusic, pauseMusic])

  useEffect(() => {
    if (!isMusicEnabled) return

    const unlockPlayback = () => {
      void playMusic()
    }

    window.addEventListener('pointerdown', unlockPlayback, { once: true })
    return () => window.removeEventListener('pointerdown', unlockPlayback)
  }, [isMusicEnabled, playMusic])

  const value = useMemo(
    () => ({
      isMusicEnabled,
      toggleMusic,
      currentTrackId,
      currentTrack,
      tracks: musicTracks,
      selectTrack,
      volume,
      setVolume,
    }),
    [currentTrack, currentTrackId, isMusicEnabled, selectTrack, toggleMusic, volume],
  )

  return (
    <BackgroundMusicContext.Provider value={value}>
      <audio ref={audioRef} loop preload="auto" />
      {children}
    </BackgroundMusicContext.Provider>
  )
}

export const useBackgroundMusic = (): BackgroundMusicContextValue => {
  const context = useContext(BackgroundMusicContext)
  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider')
  }
  return context
}
