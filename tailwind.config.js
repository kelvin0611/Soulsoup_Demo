/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 中医主题色
        'tcm': {
          'paper': '#FDF8F3',      // 宣纸白
          'ink': '#2C2C2C',        // 墨黑
          'green': '#4A7C59',      // 药草绿
          'green-light': '#7FB285',
          'brown': '#8B6F47',      // 药材棕
          'brown-light': '#C4A77D',
          'red': '#C75B5B',        // 丹砂红
          'gold': '#D4A574',       // 古铜金
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      }
    },
  },
  plugins: [],
}
