import React, { useEffect, useRef, useState } from 'react'

const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 700,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'zoom-in', 'slide-left', 'slide-right'
  threshold = 0.1 
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          // Once revealed, we can unobserve
          if (elementRef.current) {
            observer.unobserve(elementRef.current)
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entering the screen fully
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  // Get animation starting state classes
  const getAnimationClasses = () => {
    if (isRevealed) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100'
    }

    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-10 scale-98'
      case 'fade-down':
        return 'opacity-0 -translate-y-10 scale-98'
      case 'fade-in':
        return 'opacity-0'
      case 'zoom-in':
        return 'opacity-0 scale-90'
      case 'slide-left':
        return 'opacity-0 -translate-x-12'
      case 'slide-right':
        return 'opacity-0 translate-x-12'
      default:
        return 'opacity-0 translate-y-10'
    }
  }

  const style = {
    transitionProperty: 'opacity, transform, scale',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' // premium easeOutCubic
  }

  return (
    <div
      ref={elementRef}
      className={`transform transition-all ${getAnimationClasses()} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
