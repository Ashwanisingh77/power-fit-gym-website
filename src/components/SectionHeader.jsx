import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle, gradient = true, className = '' }) {
  return (
    <motion.div
      className={`text-center mb-16 md:mb-20 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {subtitle && (
        <motion.p
          className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-accent-cyan)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${gradient ? 'gradient-text' : ''}`}
      >
        {title}
      </h2>
      <motion.div
        className="mx-auto mt-6 h-[2px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-accent-cyan), var(--color-accent-violet), transparent)',
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '6rem', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
