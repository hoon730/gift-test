import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#fdfcfa',
          100: '#f9f7f2',
          200: '#f5f1e8',
          300: '#ebe5d7',
          400: '#d9d0bb',
          500: '#c7ba9f',
          600: '#b5a583',
          700: '#9a8a6b',
          800: '#7f7158',
          900: '#655847',
        },
        accent: {
          50: "#fff5f3",
          100: "#ffe8e3",
          200: "#ffd5cc",
          300: "#ffb8aa",
          400: "#ff8f77",
          500: "#ff6b4a",
          600: "#f04e2e",
          700: "#d63d1f",
          800: "#b2341a",
          900: "#942f1a",
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f4f2',
          200: '#e8e4df',
          300: '#dbd4cc',
          400: '#cec4b9',
          500: '#b8aca0',
          600: '#9d9184',
          700: '#7d736a',
          800: '#5d5550',
          900: '#2c2c2c',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
