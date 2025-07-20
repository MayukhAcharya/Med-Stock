import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16, 'height'),
      backgroundColor: colors.pureWhite,
    },
    boxContainer: {
      width: normalize(170, 'width'),
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: normalize(12),
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(14, 'height'),
      alignItems: 'center',
      backgroundColor: colors.pureWhite,
      rowGap: normalize(10),
      justifyContent: 'center',
      elevation: 3,
    },
    imageStyle: {
      resizeMode: 'contain',
      width: normalize(120, 'width'),
      height: normalize(120, 'height'),
    },
    profileTextStyle: {
      ...fonts.medium,
      fontSize: normalize(16),
      color: colors.pureBlack,
      textAlign: 'center',
    },
    plusIconPressStyle: {
      width: normalize(56),
      height: normalize(56),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(28),
    },
    fabButtonStyle: {
      position: 'absolute',
      right: normalize(20),
      bottom: normalize(30),
      backgroundColor: colors.primaryBlue,
      width: normalize(56),
      height: normalize(56),
      borderRadius: normalize(28),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    flatlistInnerView: {
      justifyContent: 'space-between',
      flex: 1,
      marginBottom: 16,
    },
    healthProfileExplainTextStyle: {
      ...fonts.regular,
      color: colors.pureBlack,
      fontSize: normalize(18),
      textAlign: 'center',
      lineHeight: normalize(25),
    },
    healthExplainBox: {
      marginTop: normalize(30, 'height'),
      marginBottom: normalize(20, 'height'),
      alignItems: 'center',
    },
    heartImageStyle: {
      width: normalize(200, 'width'),
      height: normalize(200, 'height'),
    },
    manageTextStyle: {
      ...fonts.bold,
      color: colors.pureBlack,
      fontSize: normalize(28),
    },
    hereTextStyle: {
      ...fonts.regular,
      color: colors.primaryBlue,
      fontSize: normalize(18),
      textAlign: 'center',
      textDecorationLine: 'underline',
      textDecorationColor: colors.primaryBlue,
      lineHeight: normalize(25),
    },
  });
