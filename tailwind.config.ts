import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pastel palette
        lavender: '#e8d7ff',
        pink: '#ffd3e8',
        blush: '#ffd7d5',
        cream: '#f3ffe1',
        mint: '#dfffd6',
        // Deeper variants for chart strokes/accents
        'lavender-deep': '#b89be0',
        'pink-deep': '#e89dc1',
        'blush-deep': '#e89e9a',
        'cream-deep': '#c5d99a',
        'mint-deep': '#9dd190',
        // Ink scale
        ink: {
          DEFAULT: '#2a2433',
          body: '#4a4456',
          soft: '#7d7689',
          muted: '#a8a3b3',
        },
        line: 'rgba(42, 36, 51, 0.10)',
        'line-soft': 'rgba(42, 36, 51, 0.06)',
        surface: '#faf6f0',
        'surface-glass': 'rgba(255, 255, 255, 0.55)',
        'surface-glass-hi': 'rgba(255, 255, 255, 0.78)',
        'surface-card': 'rgba(255, 255, 255, 0.88)',
        success: '#2a7a2a',
        danger: '#b04040',
      },
      fontFamily: {
        sans: ['"Sour Gummy"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        DEFAULT: '14px',
        md: '14px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(70, 60, 90, 0.06), 0 1px 2px rgba(70, 60, 90, 0.04)',
        DEFAULT: '0 8px 24px rgba(70, 60, 90, 0.08), 0 2px 6px rgba(70, 60, 90, 0.05)',
        md: '0 8px 24px rgba(70, 60, 90, 0.08), 0 2px 6px rgba(70, 60, 90, 0.05)',
        lg: '0 20px 50px rgba(70, 60, 90, 0.12), 0 6px 16px rgba(70, 60, 90, 0.06)',
        clay: '0 10px 30px -8px rgba(70,60,90,0.18), inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -6px 0 rgba(0,0,0,0.04)',
        'clay-soft':
          '0 6px 18px -8px rgba(70,60,90,0.16), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -4px 0 rgba(0,0,0,0.03)',
      },
      backdropBlur: {
        xs: '4px',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s ease',
      },
    },
  },
  plugins: [],
} satisfies Config;
