import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FloatingElements from './FloatingElements'
import trainer1 from '../assets/images/trainer-1.png'
import trainer2 from '../assets/images/trainer-2.png'
import trainer3 from '../assets/images/trainer-3.png'

const trainers = [
  {
    name: 'Marcus Chen',
    role: 'Strength & Conditioning',
    image: trainer1,
    experience: '12+ Years',
    specialties: ['Powerlifting', 'HIIT', 'Functional'],
    bio: 'Former competitive powerlifter with a passion for helping clients discover their true strength potential.',
    socials: { instagram: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Sarah Mitchell',
    role: 'Cardio & Nutrition',
    image: trainer2,
    experience: '10+ Years',
    specialties: ['CrossFit', 'Nutrition', 'Endurance'],
    bio: 'Certified nutritionist and fitness expert specializing in holistic body transformation programs.',
    socials: { instagram: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'David Park',
    role: 'Yoga & Flexibility',
    image: trainer3,
    experience: '8+ Years',
    specialties: ['Yoga', 'Mobility', 'Recovery'],
    bio: 'International yoga instructor bringing mindfulness and flexibility training to modern fitness.',
    socials: { instagram: '#', twitter: '#', linkedin: '#' },
  },
]

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-base)' }}
    >
      <FloatingElements count={4} />

      <div className="container-custom">
        <SectionHeader
          subtitle="Meet The Experts"
          title="Our Trainers"
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              className="glass rounded-3xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -10,
                boxShadow: '0 25px 60px rgba(0,255,204,0.12), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, transparent 30%, rgba(3,7,18,0.95) 100%)',
                }} />

                {/* Experience badge */}
                <motion.div
                  className="absolute top-4 right-4 glass-strong rounded-full px-4 py-1.5"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xs font-bold" style={{ color: 'var(--color-accent-cyan)' }}>
                    {trainer.experience}
                  </span>
                </motion.div>

                {/* Name overlay at bottom of image */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-accent-cyan)' }}>
                    {trainer.role}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  {trainer.bio}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {trainer.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(0,255,204,0.08)',
                        color: 'var(--color-accent-cyan)',
                        border: '1px solid rgba(0,255,204,0.15)',
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, link: trainer.socials.instagram },
                    { Icon: Twitter, link: trainer.socials.twitter },
                    { Icon: Linkedin, link: trainer.socials.linkedin },
                  ].map(({ Icon, link }, si) => (
                    <motion.a
                      key={si}
                      href={link}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--color-text-muted)',
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(0,255,204,0.15)',
                        color: 'var(--color-accent-cyan)',
                        boxShadow: '0 0 15px rgba(0,255,204,0.2)',
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
