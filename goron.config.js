const colors = {
  'primary': '#006ba6',
  'primary-mid': '#004a73',
  'primary-trans': 'rgba(0,30,47, 0.9)',
  'transparent': 'transparent',
  'light': '#efefef',
  'dark': '#252525'
};

const fonts = {
  'base': '"latoregular", Helvetica, sans-serif',
  'base-heavy': '"latoblack", Helvetica, sans-serif',
  'serif': '"calistogaregular", Times New Roman, serif'
};

const sizeScale = {
  '400': '1rem',
  '500': '1.35rem',
  '600': '1.8rem',
  '700': '3.2rem',
  '800': '4.2rem'
};

module.exports = {
  colors,
  sizeScale,
  fonts,
  generateCustomProperties: true,
  utilities: {
    'bg': {
      items: colors,
      output: 'standard',
      property: 'background'
    },
    'border': {
      items: colors,
      output: 'standard',
      property: 'border-color'
    },
    'color': {
      items: colors,
      output: 'standard',
      property: 'color'
    },
    'space': {
      items: sizeScale,
      output: 'standard',
      property: '--flow-space'
    },
    'font': {
      items: fonts,
      output: 'standard',
      property: 'font-family'
    },
    'gap-top': {
      items: sizeScale,
      output: 'standard',
      property: 'margin-top'
    },
    'gap-bottom': {
      items: sizeScale,
      output: 'standard',
      property: 'margin-bottom'
    },
    'leading': {
      items: {
        tight: '1.1',
        mid: '1.5'
      },
      output: 'standard',
      property: 'line-height'
    },
    'measure': {
      items: {
        short: '50ch'
      },
      output: 'standard',
      property: 'max-width'
    },
    'pad-top': {
      items: sizeScale,
      output: 'standard',
      property: 'padding-top'
    },
    'pad-bottom': {
      items: sizeScale,
      output: 'standard',
      property: 'padding-bottom'
    },
    'pad-left': {
      items: sizeScale,
      output: 'standard',
      property: 'padding-left'
    },
    'text': {
      items: sizeScale,
      output: 'responsive',
      property: 'font-size'
    }
  },
  breakpoints: {
    md: '48em'
  }
};
