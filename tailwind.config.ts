import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-black': '#181619',
        'gold': '#ca9215',
        'gold-2': '#ffbb71',
        'blue': '#a6bef6',
        'blue-2': '#729bd9',
        'off-white': '#fce2ef',
        'paper-bg': '#d1d3c7',
      },
      borderRadius: {
        'custom': '0.5rem',
        'custom-lg': '1.5rem',
        'custom-xl': '2rem',
      },
      fontFamily: {
        sans: ['Helvetica Neue Extended', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'honor': ['Neue Haas Grotesk', 'Neue Haas', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        'role': ['Division', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
