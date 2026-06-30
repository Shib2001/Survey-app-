import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Blood Red Primary Palette ──
        primary: {
          50:  '#FFF5F5',
          100: '#FFE0E0',
          200: '#FFC2C2',
          300: '#FF8A8A',
          400: '#FF5252',
          500: '#DC2626',    // ← Blood Red (main)
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#450A0A',
        },
        // ── Secondary: Warm Slate ──
        secondary: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // ── Light Theme Backgrounds ──
        surface: {
          DEFAULT: '#FFFFFF',       // Main background
          secondary: '#F8FAFC',     // Panel background
          tertiary: '#F1F5F9',      // Card/section background
          hover: '#E2E8F0',         // Hover states
        },
        // ── Text ──
        content: {
          DEFAULT: '#0F172A',       // Primary text (dark on light)
          secondary: '#475569',     // Muted text
          muted: '#94A3B8',         // Very muted
          inverse: '#FFFFFF',       // White text on red backgrounds
        },
        // ── Borders ──
        border: {
          DEFAULT: '#E2E8F0',       // Subtle light borders
          active: '#DC2626',        // Active state = blood red
        },
        // ── Status Colors ──
        success: '#16A34A',
        warning: '#EAB308',
        error:   '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft':    '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium':  '0 4px 16px rgba(0, 0, 0, 0.08)',
        'strong':  '0 8px 32px rgba(0, 0, 0, 0.12)',
        'red-glow': '0 4px 24px rgba(220, 38, 38, 0.25)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config;