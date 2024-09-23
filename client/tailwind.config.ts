import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
					light: '#BFE5DB',
				},
				text: {
					DEFAULT: '#131313',
					foreground: '#535353',
					base: '#1C1C1C',
				
				},
				secondary: {
					DEFAULT: '#23599D',
					foreground: '#EAF6F3',
				},
				description: {
					DEFAULT: '#323232',
					foreground: '#727272',
				},
				alert: {
					DEFAULT: '#DC2626',
					dark: '#B21010',
					foreground: '#FCF6CF',
				},
				button: {
					DEFAULT: '#C6C6C6',
					text: '#B0B0B0',
					foreground: '#A8A8A8',
				},
				span: {
					DEFAULT: '#666666',
					foreground: '#868686',
					background: '#E8E8E8',
				},
				border: {
					DEFAULT: '#DDDDDD',
				},
				// light mode
				tremor: {
					brand: {
						faint: colors.blue[50],
						muted: colors.blue[200],
						subtle: colors.blue[400],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[700],
						inverted: colors.white,
					},
					background: {
						muted: colors.gray[50],
						subtle: colors.gray[100],
						DEFAULT: colors.white,
						emphasis: colors.gray[700],
					},
					border: {
						DEFAULT: colors.gray[200],
					},
					ring: {
						DEFAULT: colors.gray[200],
					},
					content: {
						subtle: colors.gray[400],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[700],
						strong: colors.gray[900],
						inverted: colors.white,
					},
				},
				// dark mode
				'dark-tremor': {
					brand: {
						faint: '#0B1229',
						muted: colors.blue[950],
						subtle: colors.blue[800],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[400],
						inverted: colors.blue[950],
					},
					background: {
						muted: '#131A2B',
						subtle: colors.gray[800],
						DEFAULT: colors.gray[900],
						emphasis: colors.gray[300],
					},
					border: {
						DEFAULT: colors.gray[800],
					},
					ring: {
						DEFAULT: colors.gray[800],
					},
					content: {
						subtle: colors.gray[600],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[200],
						strong: colors.gray[50],
						inverted: colors.gray[950],
					},
				},
			},
			boxShadow: {
				// light
				'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'tremor-card':
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'tremor-dropdown':
					'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				// dark
				'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'dark-tremor-card':
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'dark-tremor-dropdown':
					'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			},
			borderRadius: {
				'tremor-small': '0.375rem',
				'tremor-default': '0.5rem',
				'tremor-full': '9999px',
			},
			fontSize: {
				'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
				'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
				'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
				'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
				'bold-14': ['14px', { lineHeight: '14px' }],
				'bold-16': ['16px', { lineHeight: '145%' }],
				'bold-18': ['18px', { lineHeight: '145%' }],
				'bold-20': ['20px', { lineHeight: '150%' }],
				'bold-56': ['56px', { lineHeight: 'auto' }],
				'bold-italic-22': ['22px', { lineHeight: '145%' }],
				'italic-20': ['20px', { lineHeight: '22px' }],
				'italic-40': ['20px', { lineHeight: 'auto' }],
				'semibold-14': ['14px', { lineHeight: '22px' }],
				'semibold-18': ['18px', { lineHeight: '150%' }],
				'semibold-15': ['15px', { lineHeight: '22px' }],
				'semibold-36': ['36px', { lineHeight: '160%' }],
				'semibold-50': ['50px', { lineHeight: '160%' }],
				'semibold-40': ['40px', { lineHeight: 'auto' }],
				'semibold-22': ['22px', { lineHeight: 'auto' }],
				'semibold-24': ['24px', { lineHeight: 'auto' }],
			},
			letterSpacing: {
				'-2%': '-0.02em',
			},
			fontFamily: {
				sans: ['Work Sans', 'sans-serif'],
				regular: ['"Open Sans"', 'sans-serif'],
			},
		},


	},
	safelist: [
		{
			pattern:
				/^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
				/^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
				/^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
	],
	plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
};
export default config;
