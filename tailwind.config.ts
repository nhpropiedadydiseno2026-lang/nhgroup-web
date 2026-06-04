import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E4C97E',
          dark: '#9A7A2E',
        },
        cream: {
          DEFAULT: '#F8F6F1',
          dark: '#F2EFE8',
          border: '#E8E4DC',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          80: '#1A1A1A',
          60: '#3D3D3D',
          40: '#6B6B6B',
          20: '#9E9E9E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #9A7A2E 0%, #C9A84C 50%, #E4C97E 100%)',
      },
    },
  },
  plugins: [],
}
export default config
