import React from 'react';
import Navigator from './Navigator';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {COLORS} from '../assets/colors';
import {AuthUserProvider} from '../context/AuthUserProvider';

const theme = createTheme({
  lightColors: {
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark,
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary,
    background: COLORS.white,
    white: COLORS.white,
    error: COLORS.error,
    transparent: COLORS.transparent,
  },
  darkColors: {
    primary: COLORS.white,
    primaryDark: COLORS.black,
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary,
    background: COLORS.black,
    error: COLORS.error,
    loading: COLORS.primaryDark,
    transparent: COLORS.transparent,
  },
  mode: 'light',
  components: {
    Button: {
      containerStyle: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: COLORS.accent,
        borderRadius: 5,
      },
      buttonStyle: {
        height: 48,
        backgroundColor: COLORS.accent,
        borderRadius: 3,
      },
      titleStyle: {color: COLORS.white},
    },
    ButtonGroup: {
      containerStyle: {
        height: 35,
        marginTop: 20,
        marginBottom: 20,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
      },
      buttonStyle: {
        height: 32,
      },
      textStyle: {color: COLORS.primary},
      innerBorderStyle: {color: COLORS.primary},
    },
    Image: {
      containerStyle: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120 / 2,
        backgroundColor: COLORS.transparent,
      },
    },
    Input: {
      inputContainerStyle: {
        borderBottomColor: COLORS.grey,
      },
    },
  },
});

const Providers = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <Navigator />
      </AuthUserProvider>
    </ThemeProvider>
  );
};

export default Providers;
