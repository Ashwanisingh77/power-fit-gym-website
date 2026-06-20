import { motion } from 'framer-motion'

const shapes = [
  { type: 'circle', size: 6, x: '10%', y: '20%', delay: 0, duration: 6, color: 'rgba(0,255,204,0.12)' },
  { type: 'circle', size: 4, x: '85%', y: '15%', delay: 1, duration: 8, color: 'rgba(124,58,237,0.10)' },
  { type: 'ring', size: 10, x: '75%', y: '70%', delay: 2, duration: 7, color: 'rgba(0,255,204,0.08)' },
  { type: 'circle', size: 3, x: '20%', y: '75%', delay: 0.5, duration: 9, color: 'rgba(124,58,237,0.08)' },
  { type: 'ring', size: 8, x: '50%', y: '30%', delay: 1.5, duration: 6.5, color: 'rgba(0,255,204,0.06)' },
  { type: 'dot', size: 2, x: '30%', y: '50%', delay: 3, duration: 5, color: 'rgba(0,255,204,0.15)' },
  { type: 'dot', size: 1.5, x: '60%', y: '85%', delay: 2.5, duration: 7, color: 'rgba(124,58,237,0.12)' },
  { type: 'triangle', size: 5, x: '90%', y: '45%', delay: 1, duration: 8, color: 'rgba(0,255,204,0.06)' },
]

export default function FloatingElements({ count = 8, className = '' }) {
  const visibleShapes = shapes.slice(0, count)

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {visibleShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, -10, -25, 0],
            rotate: [0, 2, -1, 1, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="rounded-full"
              style={{
                width: `${shape.size}rem`,
                height: `${shape.size}rem`,
                background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
                filter: 'blur(1px)',
              }}
            />
          )}
          {shape.type === 'ring' && (
            <div
              className="rounded-full"
              style={{
                width: `${shape.size}rem`,
                height: `${shape.size}rem`,
                border: `1px solid ${shape.color}`,
                background: 'transparent',
              }}
            />
          )}
          {shape.type === 'dot' && (
            <motion.div
              className="rounded-full"
              style={{
                width: `${shape.size}rem`,
                height: `${shape.size}rem`,
                background: shape.color,
                boxShadow: `0 0 20px ${shape.color}`,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: shape.delay }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size * 0.5}rem solid transparent`,
                borderRight: `${shape.size * 0.5}rem solid transparent`,
                borderBottom: `${shape.size * 0.8}rem solid ${shape.color}`,
                filter: 'blur(0.5px)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
