'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  className?: string
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium
    transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    overflow-hidden group
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-rose-500 to-rose-600 text-white
      hover:from-rose-600 hover:to-rose-700
      focus:ring-rose-500 shadow-lg hover:shadow-xl
      before:absolute before:inset-0 before:bg-white before:opacity-0
      before:transition-opacity before:duration-300 hover:before:opacity-10
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700 text-white
      hover:from-gray-700 hover:to-gray-800
      focus:ring-gray-500 shadow-lg hover:shadow-xl
    `,
    outline: `
      border-2 border-rose-500 text-rose-500 bg-transparent
      hover:bg-rose-500 hover:text-white hover:border-rose-600
      focus:ring-rose-500
      before:absolute before:inset-0 before:bg-rose-500 before:opacity-0
      before:transition-opacity before:duration-300 hover:before:opacity-100
      before:-z-10
    `,
    ghost: `
      text-gray-600 bg-transparent hover:bg-gray-100
      focus:ring-gray-500
    `
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-lg gap-2',
    lg: 'px-6 py-3 text-base rounded-lg gap-2'
  }

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden rounded-inherit">
        <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-inherit" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-inherit">
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : icon ? (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        ) : null}
        
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
        </span>
      </span>

      {/* Shine effect */}
      <span className="absolute inset-0 -top-2 -bottom-2 left-0 w-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 skew-x-12 group-hover:w-full transition-all duration-700 ease-out" />
    </button>
  )
}
