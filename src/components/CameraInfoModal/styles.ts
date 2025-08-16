import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.backgroundTransparent,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    subContainer: {
      width: normalize(290, 'width'),
      backgroundColor: colors.pureWhite,
      paddingHorizontal: normalize(20),
      paddingVertical: normalize(16, 'height'),
      borderRadius: normalize(12),
    },
    beforeTextStyle: {
      ...fonts.bold,
      fontSize: normalize(20),
      color: colors.extraDarkBlue,
    },
    infoTextStyle: {
      ...fonts.regular,
      fontSize: normalize(15),
      color: colors.extraDarkBlue,
      lineHeight: normalize(20),
    },
    buttonStyle: {
      width: '100%',
      height: normalize(40, 'height'),
    },
    buttonTextStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.pureWhite,
    },
  });
