
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      screens: {
        '3xl': '1920px',   // 27 inch
        '4xl': '2560px', // 32 inch
        '5xl': '3000px',   // >32 inch
      },
      fontFamily: {
        body: ['PP Mori', 'sans-serif'],
        headline: ['PP Mori', 'sans-serif'],
        code: ['monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
        fontSize: {
          // Outsourcing / eyebrow
          eyebrowSm: ['1.375rem', { lineHeight: '2rem' }],        // 22px / ~32px
          eyebrowMd: ['1.5rem', { lineHeight: '2.2rem' }],        // 24px / ~35px
          eyebrow: ['1.625rem', { lineHeight: '2.23125rem' }],    // 26px / 35.7px
          // Outsourcing / eyebrow (responsive scaled)
eyebrowwSm: ['4.5rem',  { lineHeight: '4.6rem' }],   // 72px / 73.6px  (mobile)
eyebrowwMd: ['5.375rem',{ lineHeight: '5.45rem' }], // 86px / 87.2px  (tablet)
eyebroww:   ['6.0625rem',{ lineHeight: '6.10625rem' }], // 97px / 97.7px (desktop)

         // Tiny text
    tinySm: ['0.8125rem', { lineHeight: '0.9125rem' }],   
    tinyMd: ['0.875rem', { lineHeight: '1rem' }],         
    tinyLg: ['0.9375rem', { lineHeight: '1.0625rem' }],  
          // Heading
          heroSm: ['3rem', { lineHeight: '3.4rem' }],             // 48px / ~54px
          heroMd: ['4rem', { lineHeight: '4.2rem' }],             // 64px / ~67px
          hero: ['5rem', { lineHeight: '5.0375rem' }],            // 80px / 80.6px
          // BIG HERO (renamed from hero -> bgh)
bghSm: ['4.5rem', { lineHeight: '4.8rem' }],       // 72px / 76.8px
bghMd: ['5.5rem', { lineHeight: '5.8rem' }],       // 88px / 92.8px
bghLg: ['6.1875rem', { lineHeight: '6.225rem' }],  // 99px / 99.6px ✅ FINAL SIZE
          
         // Headings
  herooSm: ['1.9125rem', { lineHeight: '2.15rem' }],       // 30.6px / 34.4px
  herooMd: ['2.55rem', { lineHeight: '2.66875rem' }],      // 40.8px / 42.7px
  heroo: ['3.1875rem', { lineHeight: '3.51875rem' }],      // 51px / 56.3px
  
  herSm: ['2.325rem', { lineHeight: '2.6125rem' }],   // 37.2px / 41.8px
  herMd: ['3.09375rem', { lineHeight: '3.24375rem' }], // 49.5px / 51.9px
  her: ['3.875rem', { lineHeight: '4.28125rem' }],     // 62px / 68.5px
  
  
          // Paragraph
          bodySm: ['1.125rem', { lineHeight: '1.75rem' }],        // 18px / 28px
          bodyMd: ['1.25rem', { lineHeight: '1.9rem' }],          // 20px / ~30px
          bodylg: ['1.375rem', { lineHeight: '1.99375rem' }],     // 22px / 31.9px
          // Paragraphs
          bodyySm: ['0.91875rem', { lineHeight: '1.43125rem' }],   // 14.7px / 22.9px
  bodyyMd: ['1.0225rem', { lineHeight: '1.534375rem' }],  // 16.36px / 24.55px
  bodyylg: ['1.125rem', { lineHeight: '1.6875rem' }],     // 18px / 27px
  
        
          // Button
          button: ['1.0625rem', { lineHeight: '1.11875rem' }],    // 17px / 17.9px
          testimonialName: ['0.9375rem', { lineHeight: '1.325rem' }],  // 15px / 21.2px
    testimonialTitle: ['0.9375rem', { lineHeight: '1.325rem' }], // 15px / 21.2px
    testimonialReview: ['0.9375rem', { lineHeight: '1.425rem' }], // 15px / 22.8px
        },
      
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cream: '#FEFDFB',
        'cream-light': '#FDFBF7',
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
          '0%, 100%': { transform: 'translateY(-15px)' },
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
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marching-ants': {
          'from': { 'stroke-dashoffset': '20' },
          'to': { 'stroke-dashoffset': '0' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-in-from-top': {
            from: { transform: 'translateY(-100%)' },
            to: { transform: 'translateY(0)' },
        },
        'slide-out-to-top': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(-100%)' },
        },
        'shake': {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
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
        'marquee': 'marquee 60s linear infinite',
        'marquee-partner': 'marquee 40s linear infinite',
        'marquee-right': 'marquee-right 60s linear infinite',
        'marching-ants': 'marching-ants 1s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-flow': 'gradient-flow 15s ease infinite',
        'slide-in-from-top': 'slide-in-from-top 0.5s ease-in-out',
        'slide-out-to-top': 'slide-out-to-top 0.5s ease-in-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
