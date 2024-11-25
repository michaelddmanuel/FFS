/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        meta: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff3b3b',
          600: '#ff1111',
          700: '#e70000',
          800: '#bf0000',
          900: '#9d0000',
          950: '#560000',
        },
        dark: {
          100: '#1E1E1E',
          200: '#2D2D2D',
          300: '#3D3D3D',
          400: '#4D4D4D',
          500: '#5C5C5C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0px 2px 4px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0px 4px 6px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
}
