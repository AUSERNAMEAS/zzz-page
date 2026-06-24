import { useEffect, useState } from 'react'
import { BackgroundMusicProvider } from './audio'
import { I18nProvider } from './i18n'
import { AgentBuilderPage } from './pages/agentBuilder'
import { MainPage } from './pages/main'

const getRouteFromHash = (): string => window.location.hash

function AppRoutes() {
  const [route, setRoute] = useState(getRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === '#TeamBuilder') {
    return <AgentBuilderPage />
  }

  return <MainPage />
}

function App() {
  return (
    <I18nProvider>
      <BackgroundMusicProvider>
        <AppRoutes />
      </BackgroundMusicProvider>
    </I18nProvider>
  )
}

export default App
