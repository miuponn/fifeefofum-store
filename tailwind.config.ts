import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        chewie: ['ChewieDEMO', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        magicalsnow: ['MagicalSnow', 'sans-serif'],
        snowdoodle: ['SnowDoodle', 'sans-serif'],
        viucobacoba: ['ViuCobacoba', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF', // white 
        bg_pink: '#FFF7F7', // background color 
        bg_green: '#DCEDC1', // background color
        accent_pink: '#FFB8C2', // header and footer color
        accent_green: '#A2D992', // text color
        dark_green: '#4E6F46', // text color
        pink: '#FFB6B7', // text color
        dark_pink: '#F68B9B', // currency color, header color, text color
        dark_pink_secondary: '#FF91A1', // name stroke color, nav bar color
        button_pink: '#FFAAB7', // button color, text color
        peach: '#FFC9C9', // button color
        mauve: "#E57485", // button text color
        red: '#AF001A', // button text color
        blue: '#92C3FF', // text color
      },
      dropShadow: {
        'custom': '2px 2px 20px rgba(100, 0, 0, 0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gentle': 'pulseGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;