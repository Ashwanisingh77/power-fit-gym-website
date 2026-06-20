import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavClick(e, href) {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong py-3 shadow-lg shadow-black/20'
            : 'py-5 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="relative text-2xl md:text-3xl font-extrabold tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">POWER</span>
            <span style={{ color: 'var(--color-text-primary)' }}>FIT</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-violet))' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group"
                style={{
                  color: activeSection === link.href.slice(1)
                    ? 'var(--color-accent-cyan)'
                    : 'var(--color-text-secondary)',
                }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'var(--color-accent-cyan)', boxShadow: '0 0 8px var(--color-accent-cyan)' }}
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              </a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-4 px-5 py-2.5 rounded-full text-sm font-semibold text-black"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,255,204,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="lg:hidden relative z-50 p-2 rounded-lg"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-72 glass-strong"
              style={{ background: 'rgba(10, 15, 30, 0.95)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col pt-24 px-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="py-3 px-4 rounded-xl text-lg font-medium transition-colors"
                    style={{
                      color: activeSection === link.href.slice(1)
                        ? 'var(--color-accent-cyan)'
                        : 'var(--color-text-secondary)',
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    whileHover={{ x: 8, color: '#fff' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="mt-4 py-3 px-6 rounded-full text-center font-semibold text-black"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join Now
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
