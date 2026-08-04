/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: 'var(--bone)',
        'bone-2': 'var(--bone-2)',
        cream: 'var(--cream)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        red: 'var(--red)',
        'red-deep': 'var(--red-deep)',
        gold: 'var(--gold)',
        'gold-deep': 'var(--gold-deep)',
        teal: 'var(--teal)',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        editorial: ['var(--font-serif)'],
        accent: ['var(--font-accent)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
        sans: ['var(--font-body)', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
