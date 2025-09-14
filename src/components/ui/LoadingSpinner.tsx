'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'border-rose-500',
    white: 'border-white',
    gray: 'border-gray-500'
  }

  return (
    <div className={`
      animate-spin rounded-full border-2 border-transparent
      ${sizeClasses[size]}
      ${colorClasses[color]}
      border-t-current
      ${className}
    `} />
  )
}
