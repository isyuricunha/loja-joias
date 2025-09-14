'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  backgroundImage?: string
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = '',
  backgroundImage
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  )
}
