import {extendTheme} from 'native-base';

// import colors from '../constants/colors';

const theme = extendTheme({
  //   colors: {
  //     primary: {
  //       main: colors.PRIMARY,
  //       50: '#faebeb',
  //       100: '#efc3c3',
  //       200: '#e49a9a',
  //       300: '#d97272',
  //       400: '#cf4a4a',
  //       500: '#b53030',
  //       600: '#8d2626',
  //       700: '#651b1b',
  //       800: '#3c1010',
  //       900: '#140505',
  //     },
  //     secondary: {
  //       main: colors.SECONDARY,
  //       50: '#0d0d0d',
  //       100: '#d9d9d9',
  //       200: '#bfbfbf',
  //       300: '#a6a6a6',
  //       400: '#8c8c8c',
  //       500: '#737373',
  //       600: '#595959',
  //       700: '#404040',
  //       800: '#262626',
  //       900: '#0d0d0d',
  //     },
  //     info: {
  //       main: '#888',
  //     },
  //   },

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
