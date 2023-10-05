import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#edf8ff',
      },
      height: {
        grid: '469px',
      },
      backgroundImage: {
        cloud: 'url("/bg-cartoon-clouds.svg")',
      },
    },
  },
  plugins: [],
};

export default config;
