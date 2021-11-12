const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
		screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    },
		container: {
      center: true,
			padding: '1rem',
    },
    extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'true-gray': colors.trueGray,
				'my-dark-gray': 'var(--clr-dark-gray)',
				'my-yellow-cream': 'var(--clr-yellow-cream)',
        'my-primary': {
          light: 'var(--clr-primary-light)',
          DEFAULT: 'var(--clr-primary)',
          dark: 'var(--clr-primary-dark)'
        },
        'my-secondary': {
          light: 'var(--clr-secondary-light)',
          DEFAULT: 'var(--clr-secondary)',
          dark: 'var(--clr-secondary-dark)'
        },
      },
      fontFamily: {
				'my-body': ['var(--font-body)'],
        'my-title': ['var(--font-title)'],
      },
      maxWidth: {
        'clear': 'calc(100% - 2rem)',
        'half': '50%',
      },
      letterSpacing: {
        'my-tiny': '1px',
      },
      fontSize: {
        'my-sm': ['13px', {
          lineHeight: '14px',
        }],
        'my-xs': ['11px', {
          lineHeight: '12px',
        }],
      },
      boxShadow: {
        'my-x': '0 4px 20px 0px rgba(0, 0, 0, 0.5)',
        'my-y-heavy': '0 20px 10px 0px rgba(0, 0, 0, 1)',
      },
      minHeight: {
        'vh-50': '50vh',
        'vh-55': '55vh',
        'vh-60': '60vh',
        'vh-70': '70vh',
      },
      backgroundImage: {
        'my-gradient-radial' : 'radial-gradient(circle, rgba(0,0,0,0.80), transparent, transparent)',
      },
      zIndex: {
        'neg1': '-1',
        'pos1': '1',
        'highest': '99999',
      }
		},
  },
  variants: {
    extend: {
			scale: ['group-hover'],
      visibility: ['hover', 'focus', 'group-hover', 'group-focus'],
		},
  },
  // corePlugins: {
  //   container: false
  // },
  plugins: [
		// function ({ addComponents }) {
    //   addComponents({
    //     '.container': {
		// 			width: '100%',
    //       maxWidth: '100%',
    //       paddingLeft: '1rem',
    //       paddingRight: '1rem',
    //       marginLeft: 'auto',
    //       marginRight: 'auto',
    //       '@screen sm': {
    //         maxWidth: '720px',
    //       },
    //       '@screen md': {
    //         maxWidth: '980px',
    //       },
    //       '@screen lg': {
    //         maxWidth: '1200px',
    //       },
    //       '@screen xl': {
    //         maxWidth: '1400px',
    //       },
    //     },
    //   })
    // }
	],
}