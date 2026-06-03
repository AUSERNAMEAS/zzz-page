import { ActionGrid } from './components/ActionGrid'
import { Footer } from './components/Footer'
import { HeroText } from './components/HeroText'
import { Navbar } from './components/Navbar'

export function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-zzz-black">
      <Navbar />
      <main className="flex-1">
        <HeroText />
        <ActionGrid />
      </main>
      <Footer />
    </div>
  )
}
