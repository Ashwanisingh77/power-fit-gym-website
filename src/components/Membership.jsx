import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FloatingElements from './FloatingElements'

const plans = [
  {
    name: 'Basic',
    icon: Zap,
    price: 29,
    period: '/month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Access to gym floor',
      'Basic equipment usage',
      'Locker room access',
      '2 group classes/week',
      'Fitness assessment',
    ],
    color: 'var(--color-accent-cyan)',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Star,
    price: 59,
    period: '/month',
    description: 'For dedicated athletes who want more',
    features: [
      'Full gym access 24/7',
      'All equipment & machines',
      'Unlimited group classes',
      'Personal training (2x/mo)',
      'Nutrition consultation',
      'Sauna & spa access',
      'Progress tracking app',
    ],
    color: 'var(--color-accent-violet)',
    popular: true,
  },
  {
    name: 'Elite',
    icon: Crown,
    price: 99,
    period: '/month',
    description: 'The ultimate premium experience',
    features: [
      'Everything in Pro',
      'Unlimited personal training',
      'Custom meal plans',
      'Recovery & physio sessions',
      'VIP locker & towel service',
      'Guest passes (4/month)',
      'Priority class booking',
      'Exclusive member events',
    ],
    color: 'var(--color-accent-cyan)',
    popular: false,
  },
]

export default function Membership() {
  return (
    <section
      id="membership"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-surface)' }}
    >
      <FloatingElements count={4} />

      <div className="container-custom">
        <SectionHeader
          subtitle="Choose Your Plan"
          title="Membership"
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                className={`relative glass rounded-3xl overflow-hidden group ${
                  plan.popular ? 'md:-mt-4 md:mb-[-1rem]' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -8,
                  boxShadow: plan.popular
                    ? '0 25px 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.3)'
                    : '0 25px 60px rgba(0,255,204,0.1), 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold tracking-wider uppercase"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
                      color: '#000',
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐ Most Popular
                    </motion.span>
                  </div>
                )}

                {/* Gradient border for popular */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-3xl -z-10 opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
                      padding: '1px',
                    }}
                  />
                )}

                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  {/* Plan icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${plan.color}15`, color: plan.color }}
                  >
                    <Icon size={24} />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>$</span>
                    <span className="text-5xl font-black gradient-text">{plan.price}</span>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                          style={{ background: `${plan.color}20`, color: plan.color }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300"
                    style={
                      plan.popular
                        ? {
                            background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
                            color: '#000',
                          }
                        : {
                            background: 'transparent',
                            color: plan.color,
                            border: `1px solid ${plan.color}40`,
                          }
                    }
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 30px ${plan.color}25`,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const el = document.getElementById('contact')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
