// src/App.jsx
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx' 
import About from './sections/about.jsx';
import Services from './sections/Services.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'


export default function App() {
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
