import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Members from './pages/Members.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Faq from './pages/Faq.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import { PAGES } from './data.js'
import { AuthProvider } from './context/AuthContext.jsx'

const parseRoute = () => {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const parts = raw.split('/').filter(Boolean)

  if (parts[0] === 'login') return { area: 'login', page: 'login' }
  if (parts[0] === 'dashboard') {
    return {
      area: 'dashboard',
      page: 'dashboard',
      tab: parts[1] === 'testimonials' ? 'testimonials' : 'members',
    }
  }

  const page = PAGES.some((p) => p.id === parts[0]) ? parts[0] : 'home'
  return { area: 'public', page }
}

function AppShell() {
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = (id) => {
    const next = id === 'home' ? '/' : `/${id}`
    if (window.location.hash.replace(/^#/, '') === next || (id === 'home' && !window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = next === '/' ? '/home' : next
  }

  const hideChrome = route.area === 'login' || route.area === 'dashboard'

  return (
    <>
      <Navbar page={route.page} go={go} hideChrome={hideChrome} />
      {route.area === 'login' && <Login go={go} />}
      {route.area === 'dashboard' && <Dashboard tab={route.tab} go={go} />}
      {route.area === 'public' && route.page === 'home' && <Home go={go} />}
      {route.area === 'public' && route.page === 'members' && <Members go={go} />}
      {route.area === 'public' && route.page === 'testimonials' && <Testimonials />}
      {route.area === 'public' && route.page === 'faq' && <Faq go={go} />}
      {route.area === 'public' && route.page === 'contact' && <Contact />}
      {!hideChrome && <Footer go={go} />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}

export default App
