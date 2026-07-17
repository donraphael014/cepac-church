/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        church: {
          gold: '#C9A84C',
          navy: '#1A2A3A',
          cream: '#F5F0EB',
          dark: '#0D1B2A',
          light: '#F8F6F3',
        },
      },
    },
  },
  plugins: [],
}