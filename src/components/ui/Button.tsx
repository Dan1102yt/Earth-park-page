import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'whatsapp' | 'terracota'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-body font-bold rounded-full transition-all duration-200 cursor-pointer'

    const variants = {
      primary: 'bg-forest hover:bg-forest-dark text-white shadow-lg hover:shadow-forest/40',
      outline: 'border-2 border-cream text-cream hover:bg-cream hover:text-dark',
      ghost: 'text-cream hover:text-forest-light',
      whatsapp: 'bg-[#25D366] hover:bg-[#1da851] text-white shadow-lg',
      terracota: 'bg-terracota hover:bg-terracota/90 text-crema shadow-lg hover:shadow-terracota/40',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
