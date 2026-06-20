import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Trainers from './components/Trainers'
import Membership from './components/Membership'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'var(--color-dark-base)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="text-center">
        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-wider mb-4">
            <span className="gradient-text">POWER</span>
            <span className="text-white">FIT</span>
          </h1>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-[2px] mx-auto rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-violet))',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={onComplete}
          />
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.3em] uppercase mt-4"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Premium Fitness Experience
        </motion.p>
      </div>
    </motion.div>
  )
}

/* Custom cursor glow that follows mouse */
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    function onMove(e) {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    function onLeave() { setVisible(false) }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-screen"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(0,255,204,0.06) 0%, transparent 70%)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CursorGlow />
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <About />
            <Services />
            <Trainers />
            <Membership />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
