import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Members from './pages/Members.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import { PAGES } from './data.js'

const pageFromHash = () => {
  const hash = window.location.hash.replace('#/', '').replace('#', '')
  return PAGES.some((p) => p.id === hash) ? hash : 'home'
}

function App() {
  const [page, setPage] = useState(pageFromHash)

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (id) => {
    if (id === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = `/${id}`
  }

  return (
    <>
      <Navbar page={page} go={go} />
      {page === 'home' && <Home go={go} />}
      {page === 'members' && <Members go={go} />}
      {page === 'testimonials' && <Testimonials />}
      {page === 'faq' && <Faq go={go} />}
      {page === 'contact' && <Contact />}
      <Footer go={go} />
    </>
  )
}

export default App
