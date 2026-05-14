/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1B4F8C',
          50: '#EEF4FB',
          100: '#D7E4F2',
          200: '#AEC9E5',
          300: '#86AED8',
          400: '#5D93CB',
          500: '#3578BE',
          600: '#1B4F8C',
          700: '#163F70',
          800: '#102F54',
          900: '#0F2740',
        },
        accent: {
          DEFAULT: '#27B5C4',
          50: '#E8F8FA',
          100: '#C5EEF2',
          200: '#92DEE6',
          300: '#5FCDDA',
          400: '#27B5C4',
          500: '#1F95A1',
          600: '#17717A',
        },
        ink: '#0F2740',
        muted: '#6B7280',
        soft: '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(15, 39, 64, 0.08)',
        card: '0 4px 16px rgba(15, 39, 64, 0.06)',
        cardHover: '0 12px 32px rgba(27, 79, 140, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F2740 0%, #1B4F8C 60%, #27B5C4 100%)',
        'soft-gradient': 'linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)',
      },
      animation: {
        'bounce-slow': 'bounce 2.4s infinite',
      },
    },
  },
  plugins: [],
};
