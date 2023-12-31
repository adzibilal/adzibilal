import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                chakra: ['Chakra Petch', 'sans-serif'],
                'open-sans': ['Open Sans', 'sans-serif']
            },
            colors: {
                'black-primary': '#161513',
                'black-secondary': '#1C1C22',
                'white-primary': '#F0F2F5',
                'white-secondary': '#ffffff',
                blue: '#1fb6ff',
                purple: '#7e5bef',
                pink: '#ff49db',
                orange: '#ff7849',
                green: '#13ce66',
                yellow: '#ffc82c',
                'gray-dark': '#273444',
                gray: '#8492a6',
                'gray-light': '#d3dce6',
                transparent: 'transparent'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light']
    }
}
export default config
