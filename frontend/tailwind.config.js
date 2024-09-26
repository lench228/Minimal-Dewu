/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // указываем, где находятся ваши файлы компонентов
    './public/index.html',
  ],
  theme: {
    colors:{
      'black': '#101010',
      'white': '#F2F2F2',
      'black-light': '#262626',
      'black-light-2': '#414141',
      'white-darker-1': '#EAEAEA',
      'white-darker-2': '#D5D5D5',
      'error': '#A31B1B',
      'success': '#3AAE23',
    },
    extend: {
      fontFamily: {
        anonymous: ['Anonymous Pro', 'monospace'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

