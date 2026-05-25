import React from 'react'
import { motion } from 'framer-motion'

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 700,
  animation = 'fade-down', // 'fade-down', 'fade-up', 'fade-in', 'zoom-in', 'slide-left', 'slide-right'
  threshold = 0.1 
}) => {
  // Custom reusable variants combining scale-in, opacity fade, translation, and smooth blur-reveal
  const variants = {
    'fade-up': {
      initial: { opacity: 0, y: 60, scale: 0.96, filter: 'blur(6px)' },
      animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
    },
    'fade-down': {
      initial: { opacity: 0, y: -60, scale: 0.96, filter: 'blur(6px)' },
      animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
    },
    'fade-in': {
      initial: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' }
    },
    'zoom-in': {
      initial: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' }
    },
    'slide-left': {
      initial: { opacity: 0, x: -60, scale: 0.97, filter: 'blur(6px)' },
      animate: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }
    },
    'slide-right': {
      initial: { opacity: 0, x: 60, scale: 0.97, filter: 'blur(6px)' },
      animate: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }
    }
  }

  const selectedVariant = variants[animation] || variants['fade-down']

  // Premium Apple-style spring physics for hyper-smooth tactile transitions
  const transition = {
    type: 'spring',
    stiffness: 80,
    damping: 16,
    mass: 0.6,
    duration: duration / 1000,
    delay: delay / 1000
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: threshold, margin: '0px 0px -30px 0px' }}
      variants={selectedVariant}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
