import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: normalize(60, 'height'),
      paddingHorizontal: normalize(16),
    },
    logoText: {
      ...fonts.semiBold,
      fontSize: normalize(25),
      color: colors.pureWhite,
    },
    loginRegisterContainer: {
      marginTop: normalize(60, 'height'),
      width: normalize(343, 'width'),
      backgroundColor: colors.pureWhite,
      borderRadius: normalize(20),
      elevation: 10,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    loginTextStyle: {
      ...fonts.bold,
      fontSize: normalize(32),
      color: colors.extraDarkBlue,
    },
    noAccountTextstyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.grey,
    },
    signupTextStyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.primaryBlue,
      textAlign: 'center',
    },
    emailPassView: {
      marginTop: normalize(35, 'height'),
      rowGap: normalize(16),
    },
    forgotPassTextStyle: {
      ...fonts.semiBold,
      fontSize: normalize(12),
      color: colors.primaryBlue,
    },
    buttonStyle: {
      width: normalize(295, 'width'),
      height: normalize(46, 'height'),
      borderRadius: normalize(24),
    },
    orViewStyle: {
      marginTop: normalize(25, 'height'),
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: normalize(16),
    },
    hzline: {
      height: 1,
      backgroundColor: colors.stroke,
      width: '44%',
    },
    orTextStyle: {
      ...fonts.regular,
      fontSize: normalize(12),
      color: colors.grey,
    },
    googleButtonMainStyle: {
      backgroundColor: colors.pureWhite,
      borderWidth: 1,
      borderColor: colors.stroke,
      elevation: 0,
    },
    googleButtonLabelStyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.pureBlack,
    },
    loginContainer: {
      width: normalize(343, 'width'),
      paddingVertical: normalize(24, 'height'),
      paddingHorizontal: normalize(24, 'width'),
    },
    registerContainer: {
      width: normalize(343, 'width'),
      paddingVertical: normalize(24, 'height'),
      paddingHorizontal: normalize(24, 'width'),
    },
    signUpTextStyle: {
      ...fonts.bold,
      fontSize: normalize(25),
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
    imageStyle: {
      width: normalize(50, 'width'),
      height: normalize(50, 'height'),
      resizeMode: 'contain',
    },
    headerStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: normalize(20, 'height'),
      columnGap: normalize(10),
    },
    buttonLabelStyle: {
      ...fonts.semiBold,
      color: colors.pureWhite,
      fontSize: normalize(16),
    },
  });
