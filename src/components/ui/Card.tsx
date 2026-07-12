import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-dark-soft rounded-2xl overflow-hidden
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/20 hover:border-forest/50 border border-transparent' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
