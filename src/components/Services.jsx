import { motion } from 'framer-motion'
import { Dumbbell, Zap, Salad, Flower2 } from 'lucide-react'
import SectionHeader from './SectionHeader'
import GlassCard from './GlassCard'
import FloatingElements from './FloatingElements'

const services = [
  {
    icon: Dumbbell,
    title: 'Weight Training',
    emoji: '💪',
    description: 'Build strength and muscle with our comprehensive weight training programs featuring premium equipment and expert guidance.',
    color: 'var(--color-accent-cyan)',
    gradient: 'from-cyan-500/10 to-transparent',
  },
  {
    icon: Zap,
    title: 'Cardio',
    emoji: '🏃',
    description: 'High-intensity cardio sessions designed to boost your endurance, burn calories, and improve cardiovascular health.',
    color: 'var(--color-accent-violet)',
    gradient: 'from-violet-500/10 to-transparent',
  },
  {
    icon: Salad,
    title: 'Diet Plans',
    emoji: '🥗',
    description: 'Customized nutrition plans crafted by certified dietitians to fuel your fitness goals and optimize performance.',
    color: 'var(--color-accent-cyan)',
    gradient: 'from-cyan-500/10 to-transparent',
  },
  {
    icon: Flower2,
    title: 'Yoga',
    emoji: '🧘',
    description: 'Find balance and flexibility through our expert-led yoga classes designed for all skill levels and body types.',
    color: 'var(--color-accent-violet)',
    gradient: 'from-violet-500/10 to-transparent',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-surface)' }}
    >
      <FloatingElements count={5} />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)' }}
      />

      <div className="container-custom">
        <SectionHeader
          subtitle="What We Offer"
          title="Our Services"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <GlassCard
                key={service.title}
                delay={i * 0.1}
                hoverGlow={service.color.includes('cyan') ? 'cyan' : 'violet'}
                className="relative"
              >
                <div className="p-6 md:p-8">
                  {/* Icon Container */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative"
                    style={{
                      background: `${service.color}12`,
                      color: service.color,
                    }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                    {/* Glow ring */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 20px ${service.color}30` }}
                    />
                  </motion.div>

                  {/* Emoji accent */}
                  <span className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    {service.emoji}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <motion.div
                    className="mt-5 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: service.color }}
                  >
                    <span>Learn More</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
