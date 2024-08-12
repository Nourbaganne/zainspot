import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00927C',
          foreground: '#00604F',
          dark: '#003A2F',
        },
        darkBackground: {
          DEFAULT: '#031612',
        },
        background: {
          DEFAULT: '#FFFFFF',
          foreground: '#F3F3F3',
          light:'#BFE5DB'
        },
        text: {
          DEFAULT: '#131313',
          foreground: '#535353'
        },
        secondary: {
          DEFAULT: '#23599D',
          foreground: '#EAF6F3',
        },
        description: {
          DEFAULT: '#323232',
          foreground: '#727272'
        },
        alert: {
          DEFAULT: '#DC2626',
          dark: '#B21010',
          foreground: '#FCF6CF'
        },
        button: {
          DEFAULT: '#C6C6C6',
          text: '#B0B0B0',
        },
        span: {
          DEFAULT: '#666666',
          foreground: '#868686',
          background: '#E8E8E8'
        }
      },
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
        'regular': ['"Open Sans"', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
export default config;
