const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      'dark-gray': {
        100: '#424E66',
        200: '#232323',
        300: '#242429',
        400: '#1C1C20',
        500: '#111114',
      },
      'light-gray': {
        50: 'white',
        100: '#F5F7FA',
        200: '#EBEFF5',
        300: '#DDE3ED',
        400: '#606069',
        500: '#80808c',
      },
      brand: {
        300: '#3085E8',
      },
      primary: {
        100: '#F0F9FF',
        200: '#D1ECFF',
        300: '#3085E8',
        400: '#004A80',
        500: '#062840',
      },
      secondary: {
        100: '#FFF8EB',
        200: '#FEEBCB',
        300: '#FFA526',
        400: 'rgba(242, 146, 12, 0.99)',
        500: '#CC5500',
      },
      success: {
        100: '#E5FFF1',
        200: '#C8FADF',
        300: '#2DC573',
        400: '#11A656',
        500: '#0B733C',
      },
      danger: {
        100: '#FFF3F4',
        200: '#FCD2D2',
        300: '#DC393A',
        400: '#CC2D2E',
        500: '#B21B1C',
      },
      warning: {
        100: '#FFF8EB',
        200: '#FEEBCB',
        300: '#FFA526',
        400: '#F2920C',
        500: '#CC5500',
      },
    },
    fontFamily: {
      sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      serif: ['Manrope', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      fontSize: {
        'caption-sm': ['10px', '16px'],
        'caption-md': ['12px', '16px'],
        'caption-lg': ['14px', '24px'],
        'body-sm': ['14px', '24px'],
        'body-md': ['16px', '24px'],
        'body-lg': ['18px', '32px'],
        'title-xxs': [
          '16px',
          {
            letterSpacing: '-.5px',
            lineHeight: '24px',
          },
        ],
        'title-xs': [
          '20px',
          {
            letterSpacing: '-.5px',
            lineHeight: '32px',
          },
        ],
        'title-sm': [
          '24px',
          {
            letterSpacing: '-.5px',
            lineHeight: '32px',
          },
        ],
        'title-md': [
          '32px',
          {
            letterSpacing: '-1px',
            lineHeight: '40px',
          },
        ],
        'title-lg': [
          '40px',
          {
            letterSpacing: '-1.5px',
            lineHeight: '56px',
          },
        ],
        'title-xl': [
          '48px',
          {
            letterSpacing: '-1.5px',
            lineHeight: '64px',
          },
        ],
        'title-xxl': [
          '64px',
          {
            letterSpacing: '-1.8px',
            lineHeight: '88px',
          },
        ],
        'display-sm': [
          '56px',
          {
            letterSpacing: '-1.5px',
            lineHeight: '72px',
          },
        ],
        'display-md': [
          '72px',
          {
            letterSpacing: '-1.8px',
            lineHeight: '88px',
          },
        ],
        'display-lg': [
          '96px',
          {
            letterSpacing: '-2.25px',
            lineHeight: '104px',
          },
        ],
      },
      keyframes: {
        line: {
          '0%': { width: 0 },
          '100%': { width: '100%' },
        },
      },
      animation: {
        lineBar: 'line 1s ease-in-out',
      }
    },
  },
  plugins: [],
  mode: 'jit',
}
