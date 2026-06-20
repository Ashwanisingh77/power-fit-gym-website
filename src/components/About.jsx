import { motion } from 'framer-motion'
import { Target, Flame, Trophy } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FloatingElements from './FloatingElements'
import aboutImg from '../assets/images/about-gym.png'

const features = [
  {
    icon: Target,
    title: 'Precision Training',
    desc: 'Personalized programs designed to maximize your results efficiently.',
  },
  {
    icon: Flame,
    title: 'Peak Performance',
    desc: 'State-of-the-art equipment for athletes at every level.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    desc: 'Join thousands who have transformed their bodies and lives with us.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-base)' }}
    >
      <FloatingElements count={4} />

      <div className="container-custom">
        <SectionHeader
          subtitle="Who We Are"
          title="About Us"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src={aboutImg}
                alt="PowerFit Gym interior with modern equipment"
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(0,255,204,0.1) 0%, transparent 50%, rgba(124,58,237,0.1) 100%)',
              }} />

              {/* Glass info card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <p className="text-lg font-bold" style={{ color: 'var(--color-accent-cyan)' }}>
                  Est. 2011
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  Over a decade of transforming lives through fitness
                </p>
              </motion.div>
            </div>

            {/* Decorative border glow */}
            <div className="absolute -inset-1 rounded-3xl opacity-30 -z-10"
              style={{ background: 'linear-gradient(135deg, var(--color-accent-cyan), transparent, var(--color-accent-violet))' }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              We provide <span className="font-semibold text-white">world-class gym facilities</span> with
              modern equipment and expert trainers. Our mission is to empower every individual to achieve
              their peak physical potential in an environment that inspires greatness.
            </p>

            <div className="space-y-6">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={feat.title}
                    className="flex gap-4 items-start group"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(0,255,204,0.1)',
                        color: 'var(--color-accent-cyan)',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1 group-hover:text-white transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
