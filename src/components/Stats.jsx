import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, Award, Clock, Heart } from 'lucide-react'

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Active Members', color: 'var(--color-accent-cyan)' },
  { icon: Award, value: 50, suffix: '+', label: 'Expert Trainers', color: 'var(--color-accent-violet)' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years Experience', color: 'var(--color-accent-cyan)' },
  { icon: Heart, value: 100, suffix: '%', label: 'Satisfaction Rate', color: 'var(--color-accent-violet)' },
]

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span className="text-4xl sm:text-5xl md:text-6xl font-black tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--color-dark-surface)' }}
    >
      {/* Top divider */}
      <div className="section-divider" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,204,0.08), transparent 70%)' }}
      />

      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 md:p-8 text-center group hover:bg-white/[0.06] transition-colors duration-300"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 20px 40px ${stat.color === 'var(--color-accent-cyan)' ? 'rgba(0,255,204,0.1)' : 'rgba(124,58,237,0.1)'}`,
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl mb-4"
                  style={{
                    background: `${stat.color}15`,
                    color: stat.color,
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon size={24} />
                </motion.div>
                <div style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <p className="mt-2 text-sm md:text-base font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider mt-20 md:mt-28" />
    </section>
  )
}
