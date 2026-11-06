/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0B10',
        surface: '#0F121C',
        'surface-elevated': '#151926',
        'surface-card': '#111420',
        border: '#1E2538',
        'border-focus': '#00E5FF',
        primary: {
          DEFAULT: '#00E5FF',
          foreground: '#0A0B10',
          glow: 'rgba(0, 229, 255, 0.25)',
        },
        neon: {
          blue: '#00E5FF',
          tube: '#00B0FF',
          cyan: '#38BDF8',
          halo: 'rgba(0, 229, 255, 0.28)',
          glow: '#0284C7',
          deep: '#0B1528'
        },
        foundry: {
          cyan: '#00E5FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          purple: '#8B5CF6',
          sky: '#0EA5E9',
          slate: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px -3px rgba(0, 229, 255, 0.35)',
        'glow-cyan': '0 0 20px -3px rgba(0, 229, 255, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'neon-tube': '0 0 10px rgba(0, 229, 255, 0.45), 0 0 25px rgba(0, 176, 255, 0.25), inset 0 0 8px rgba(0, 229, 255, 0.15)',
        'neon-halo': '0 0 25px 2px rgba(0, 229, 255, 0.35)',
        'neon-button': '0 0 18px rgba(0, 229, 255, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
        'foundry-card': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}

