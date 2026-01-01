import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'theme-primary': 'hsl(var(--theme-primary))',
        'theme-secondary': 'hsl(var(--theme-secondary))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'zoom-in': {
          'from': { transform: 'scale(0)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'draw-circle': {
          'to': { strokeDashoffset: '0' },
        },
        'fade-scale-in': {
          'from': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
          'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'emerge-from-circle': {
            'from': { opacity: '0', transform: 'scale(0.5) translateY(0)' },
            'to': { opacity: '1', transform: 'scale(1) translateY(-100%)' },
        },
        'float-1': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        'float-4': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'border-shimmer': {
          'from': { '--shimmer-angle': '0deg' },
          'to': { '--shimmer-angle': '360deg' },
        },
        'border-glow': {
          'from': { '--shimmer-angle': '0deg' },
          'to': { '--shimmer-angle': '360deg' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-underline': {
          'to': { transform: 'scaleX(1)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marching-ants': {
          'from': { 'stroke-dashoffset': '20' },
          'to': { 'stroke-dashoffset': '0' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'zoom-in': 'zoom-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'draw-circle': 'draw-circle 3s ease-out forwards',
        'fade-scale-in': 'fade-scale-in 0.4s ease-out forwards',
        'emerge-from-circle': 'emerge-from-circle 0.5s ease-out forwards',
        'float-1': 'float-1 8s ease-in-out infinite',
        'float-2': 'float-2 12s ease-in-out infinite',
        'float-3': 'float-3 10s ease-in-out infinite',
        'float-4': 'float-4 6s ease-in-out infinite',
        'border-shimmer': 'border-shimmer 3s linear infinite',
        'border-glow': 'border-shimmer 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'draw-underline': 'draw-underline 0.5s ease-out 0.3s forwards',
        'marquee': 'marquee 30s linear infinite',
        'marching-ants': 'marching-ants 1s linear infinite'
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('framer-motion')],
} satisfies Config;
