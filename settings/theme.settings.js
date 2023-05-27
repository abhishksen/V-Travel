import {extendTheme} from 'native-base';

import colors from '../constants/colors';

const theme = extendTheme({
  colors: {
    ...colors,
    info: {
      main: '#888',
    },
  },

  fontConfig: {
    RedHatDisplay: {
      0: {
        normal: 'RedHatDisplay-Thin',
        italic: 'RedHatDisplay-ThinItalic',
      },
      50: {
        normal: 'RedHatDisplay-ExtraLight',
        italic: 'RedHatDisplay-ExtraLightItalic',
      },
      100: {
        normal: 'RedHatDisplay-Light',
        italic: 'RedHatDisplay-LightItalic',
      },
      200: {
        normal: 'RedHatDisplay-Regular',
        italic: 'RedHatDisplay-Italic',
      },
      300: {
        normal: 'RedHatDisplay-Black',
        italic: 'RedHatDisplay-BlackItalic',
      },
      400: {
        normal: 'RedHatDisplay-Medium',
        italic: 'RedHatDisplay-MediumItalic',
      },
      500: {
        normal: 'RedHatDisplay-SemiBold',
        italic: 'RedHatDisplay-SemiBoldItalic',
      },
      600: {
        normal: 'RedHatDisplay-Bold',
        italic: 'RedHatDisplay-BoldItalic',
      },
      700: {
        normal: 'RedHatDisplay-ExtraBold',
        italic: 'RedHatDisplay-ExtraBoldItalic',
      },
    },
  },

  fonts: {
    heading: 'RedHatDisplay',
    body: 'RedHatDisplay',
    mono: 'RedHatDisplay',
  },

  components: {
    Input: {
      defaultProps: {
        fontFamily: 'body',
        size: 'xl',
      },
    },

    Text: {
      baseStyle: {
        fontFamily: 'body',
      },
    },

    Heading: {
      defaultProps: {
        fontFamily: 'body',
        fontWeight: 200,
      },
    },

    Button: {
      baseStyle: {
        rounded: 'lg',
        colorScheme: 'primary.300',
      },
      defaultProps: {
        fontFamily: 'body',
        size: 'lg',
      },
    },
  },
});

export default theme;
