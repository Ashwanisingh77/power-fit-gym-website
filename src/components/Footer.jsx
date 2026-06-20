import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Twitter, Youtube, Facebook } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNavClick(e, href) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--color-dark-card)' }}>
      {/* Top Gradient Line */}
      <div className="section-divider" />

      <div className="container-custom py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-block mb-4">
              <span className="text-3xl font-extrabold tracking-wider">
                <span className="gradient-text">POWER</span>
                <span>FIT</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Premium fitness experience with world-class facilities,
              expert trainers, and transformative programs. Your journey to
              greatness starts here.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)' }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(0,255,204,0.15)',
                    color: 'var(--color-accent-cyan)',
                    boxShadow: '0 0 20px rgba(0,255,204,0.2)',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--color-accent-cyan)' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--color-text-muted)' }}
                    whileHover={{ x: 6 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--color-accent-cyan)' }}>
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <li className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="font-medium text-white">5:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-white">6:00 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-white">7:00 AM – 8:00 PM</span>
              </li>
            </ul>

            <div className="mt-6 glass rounded-xl p-4">
              <p className="text-xs font-medium" style={{ color: 'var(--color-accent-cyan)' }}>
                🔥 Pro & Elite Members
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                Enjoy 24/7 access with your membership card
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © 2026 PowerFit Gym. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-medium transition-colors duration-300 group"
            style={{ color: 'var(--color-text-muted)' }}
            whileHover={{ color: 'var(--color-accent-cyan)' }}
          >
            Back to top
            <motion.span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              whileHover={{
                y: -3,
                backgroundColor: 'rgba(0,255,204,0.15)',
                boxShadow: '0 0 15px rgba(0,255,204,0.2)',
              }}
            >
              <ArrowUp size={14} />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
