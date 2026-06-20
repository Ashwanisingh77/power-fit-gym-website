import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import SectionHeader from './SectionHeader'
import gallery1 from '../assets/images/gallery-1.png'

const galleryImages = [
  { src: gallery1, alt: 'Intense deadlift training session', caption: 'Strength Training' },
  { src: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&q=80', alt: 'Gym floor with modern equipment', caption: 'Premium Equipment' },
  { src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80', alt: 'Personal training session', caption: 'Personal Training' },
  { src: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&q=80', alt: 'Group fitness class', caption: 'Group Classes' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80', alt: 'Modern gym interior', caption: 'Modern Facilities' },
  { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80', alt: 'Cardio area', caption: 'Cardio Zone' },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-dark-base)' }}
    >
      <div className="container-custom">
        <SectionHeader
          subtitle="See Our Space"
          title="Gallery"
        />

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                i === 0 ? 'row-span-2 h-[320px] md:h-full' : 'h-[200px] md:h-[260px]'
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              onClick={() => setSelected(img)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(4px)' }}
              >
                <motion.p
                  className="text-lg font-bold text-white"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                >
                  {img.caption}
                </motion.p>
                <p className="text-xs mt-2" style={{ color: 'var(--color-accent-cyan)' }}>
                  Click to view
                </p>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
                background: 'linear-gradient(transparent, rgba(3,7,18,0.6))',
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
              onClick={() => setSelected(null)}
            />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="glass-strong rounded-xl mt-4 p-4 text-center">
                <p className="font-bold text-lg">{selected.caption}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{selected.alt}</p>
              </div>

              {/* Close button */}
              <motion.button
                className="absolute -top-4 -right-4 w-10 h-10 glass-strong rounded-full flex items-center justify-center"
                style={{ color: 'var(--color-text-primary)' }}
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
