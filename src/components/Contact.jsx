import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'
import SectionHeader from './SectionHeader'
import FloatingElements from './FloatingElements'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'powerfit@gmail.com', href: 'mailto:powerfit@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Location', value: '123 Fitness Avenue, New York, NY', href: '#' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-surface)' }}
    >
      <FloatingElements count={3} />

      <div className="container-custom">
        <SectionHeader
          subtitle="Get In Touch"
          title="Contact Us"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 md:p-10 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Name */}
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--color-accent-cyan)] focus:shadow-[0_0_20px_rgba(0,255,204,0.1)]"
              />
              <label className="absolute left-5 top-4 text-sm pointer-events-none transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[var(--color-accent-cyan)] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--color-accent-cyan)] focus:shadow-[0_0_20px_rgba(0,255,204,0.1)]"
              />
              <label className="absolute left-5 top-4 text-sm pointer-events-none transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[var(--color-accent-cyan)] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your Email
              </label>
            </div>

            {/* Message */}
            <div className="relative group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                placeholder=" "
                className="peer w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm outline-none resize-none transition-all duration-300 focus:border-[var(--color-accent-cyan)] focus:shadow-[0_0_20px_rgba(0,255,204,0.1)]"
              />
              <label className="absolute left-5 top-4 text-sm pointer-events-none transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[var(--color-accent-cyan)] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-black flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet))',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 40px rgba(0,255,204,0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {submitted ? (
                <motion.span
                  className="flex items-center gap-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle size={18} /> Message Sent!
                </motion.span>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Let's <span className="gradient-text">Connect</span>
            </h3>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Ready to start your fitness journey? Have questions about our programs?
              We'd love to hear from you. Reach out anytime!
            </p>

            <div className="space-y-5">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'rgba(0,255,204,0.08)',
                        color: 'var(--color-accent-cyan)',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                        {info.label}
                      </p>
                      <p className="font-medium group-hover:text-white transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              className="mt-10 glass rounded-2xl h-48 flex items-center justify-center overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(0,255,204,0.05), rgba(124,58,237,0.05))',
              }} />
              <div className="text-center z-10">
                <MapPin size={28} className="mx-auto mb-2" style={{ color: 'var(--color-accent-cyan)' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  123 Fitness Avenue, New York, NY
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
