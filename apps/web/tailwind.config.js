/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kid: {
          blue: '#38BDF8',
          yellow: '#FACC15',
          green: '#4ADE80',
          orange: '#FB923C',
          pink: '#F472B6',
          purple: '#A855F7',
          dark: '#1E293B',
          bg: '#F8FAFC',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
