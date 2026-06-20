import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FloatingElements from './FloatingElements'
import heroBg from '../assets/images/hero-bg.png'

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.05 + 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const headline = 'Train Like a Beast'
  const letters = headline.split('')

  function handleJoinNow() {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  function handleScrollDown() {
    const el = document.getElementById('stats')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlays */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(3,7,18,0.4) 0%, rgba(3,7,18,0.7) 50%, rgba(3,7,18,0.95) 100%)',
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,204,0.08) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.06) 0%, transparent 60%)',
      }} />

      {/* Floating Elements */}
      <FloatingElements count={6} className="z-[2]" />

      {/* Grid background */}
      <div className="absolute inset-0 z-[2] bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* Subtitle tag */}
        <motion.div
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent-cyan)', boxShadow: '0 0 10px var(--color-accent-cyan)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Premium Fitness Experience
          </span>
        </motion.div>

        {/* Main Headline — letter by letter */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] mb-6">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{
                color: letter === ' ' ? 'transparent' : undefined,
                width: letter === ' ' ? '0.3em' : undefined,
                textShadow: '0 0 60px rgba(0,255,204,0.2)',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Push your limits. <span className="gradient-text font-semibold">Transform your body.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={handleJoinNow}
            className="relative px-8 py-4 rounded-full font-bold text-base md:text-lg text-black overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(0,255,204,0.4), 0 0 80px rgba(0,255,204,0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join Now</span>
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shimmer 1.5s infinite',
                transition: 'opacity 0.3s',
              }}
            />
          </motion.button>

          <motion.button
            onClick={handleScrollDown}
            className="px-8 py-4 rounded-full font-semibold text-base md:text-lg glass group"
            style={{ color: 'var(--color-text-primary)' }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255,255,255,0.05)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="group-hover:gradient-text transition-all duration-300">Explore More</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} style={{ color: 'var(--color-accent-cyan)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
