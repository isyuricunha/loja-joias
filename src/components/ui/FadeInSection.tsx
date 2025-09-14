'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  threshold?: number
}

export default function FadeInSection({ 
  children, 
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.1
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, threshold])

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0'
    
    switch (direction) {
      case 'up': return 'translate-y-8'
      case 'down': return '-translate-y-8'
      case 'left': return 'translate-x-8'
      case 'right': return '-translate-x-8'
      default: return ''
    }
  }

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${getTransformClass()}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
