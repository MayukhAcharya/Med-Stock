import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: normalize(38, 'height'),
      paddingHorizontal: normalize(16),
    },
    logoText: {
      ...fonts.bold,
      fontSize: normalize(25),
      color: colors.pureBlack,
    },
    registerContainer: {
      marginTop: normalize(60, 'height'),
      width: normalize(343, 'width'),
      backgroundColor: colors.pureWhite,
      borderRadius: normalize(12),
      paddingVertical: normalize(24, 'height'),
      paddingHorizontal: normalize(24, 'width'),
      elevation: 10,
    },
    signUpTextStyle: {
      ...fonts.bold,
      fontSize: normalize(32),
      color: colors.extraDarkBlue,
    },
    accountTextstyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.grey,
    },
    LoginTextStyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.primaryBlue,
      textAlign: 'center',
    },
    inputContainer: {
      marginTop: normalize(25, 'height'),
      rowGap: normalize(16),
    },
    buttonStyle: {
      width: normalize(296, 'width'),
      height: normalize(46, 'height'),
      marginBottom: normalize(15, 'height'),
    },
  });
