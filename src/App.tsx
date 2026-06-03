import { I18nProvider } from './i18n'
import { MainPage } from './pages/main'

function App() {
  return (
    <I18nProvider>
      <MainPage />
    </I18nProvider>
  )
}

export default App
