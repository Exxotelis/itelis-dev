// src/App.jsx
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx' 
import About from './sections/About.jsx';
import Services from './sections/Services.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'

const VORINCHAT_SCRIPT_ID = 'vorinchat-widget-loader'

function useVorinChatWidget() {
  useEffect(() => {
    const siteKey = import.meta.env.VITE_VORINCHAT_SITE_KEY?.trim()

    if (!siteKey) return
    if (document.getElementById(VORINCHAT_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = VORINCHAT_SCRIPT_ID
    script.src = 'https://chat.vorinvista.com/chat/embed.js'
    script.defer = true
    script.dataset.siteKey = siteKey
    script.dataset.title = import.meta.env.VITE_VORINCHAT_TITLE?.trim() || 'VorinChat Support'

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])
}

export default function App() {
  useVorinChatWidget()

  return (
    <>
      <main className="root">

        <Header />
        <Hero />             
        <About />
        <Services /> 
        <Projects />
        <Contact />

      </main>
      <Footer />
      
    </>
  )
}
