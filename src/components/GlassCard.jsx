import { motion } from 'framer-motion'
import { useState } from 'react'

export default function GlassCard({
  children,
  className = '',
  hoverGlow = 'cyan',
  tilt = true,
  delay = 0,
  onClick,
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const glowColors = {
    cyan: 'rgba(0, 255, 204, 0.15)',
    violet: 'rgba(124, 58, 237, 0.15)',
    gradient: 'rgba(0, 255, 204, 0.1)',
  }

  function handleMouseMove(e) {
    if (!tilt) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 15)
    setRotateY((centerX - x) / 15)
  }

  function handleMouseLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`glass rounded-2xl overflow-hidden cursor-pointer group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${glowColors[hoverGlow]}, 0 0 0 1px rgba(255,255,255,0.1)`,
        transition: { duration: 0.3 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: tilt
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : undefined,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Hover gradient border overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,204,0.1), transparent, rgba(124,58,237,0.1))',
          transition: 'opacity 0.4s ease',
        }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  )
}
