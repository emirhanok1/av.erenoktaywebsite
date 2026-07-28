import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssTypography from '@tailwindcss/typography'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  			'2xl': '6rem'
  		},
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#1e3a5f',
  				foreground: '#ffffff',
  				light: '#2d5282',
  				dark: '#152a45'
  			},
  			navy: {
  				'700': '#23456e',
  				'900': '#142844',
  				DEFAULT: '#1e3a5f'
  			},
  			gold: {
  				'600': '#b4932f',
  				DEFAULT: '#c9a84c'
  			},
  			accent: {
  				DEFAULT: '#c9a84c',
  				foreground: '#142844'
  			},
  			background: '#f8f9fa',
  			foreground: '#1a1a2e',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: '#5a6472',
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: '#e5e7eb',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'var(--font-playfair)',
  				'Georgia',
  				'serif'
  			],
  			body: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'fluid-h1': [
  				'clamp(2rem, 5vw + 1rem, 4.5rem)',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'fluid-h2': [
  				'clamp(1.5rem, 3vw + 0.5rem, 3rem)',
  				{
  					lineHeight: '1.2'
  				}
  			],
  			'fluid-h3': [
  				'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
  				{
  					lineHeight: '1.3'
  				}
  			],
  			'fluid-body': [
  				'clamp(1rem, 0.5vw + 0.8rem, 1.25rem)',
  				{
  					lineHeight: '1.6'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		zIndex: {
  			topbar: '55',
  			header: '50',
  			whatsapp: '40',
  			ctabar: '30',
  			modal: '60'
  		}
  	}
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
}
export default config
