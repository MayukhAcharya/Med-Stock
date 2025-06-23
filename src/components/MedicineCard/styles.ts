import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      width: normalize(175, 'width'),
      borderWidth: 1,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(12, 'height'),
      borderRadius: normalize(12),
      borderColor: colors.borderColor,
      backgroundColor: colors.pureWhite,
      elevation: 5,
    },
    imageContainer: {
      width: normalize(80, 'width'),
      height: normalize(80, 'height'),
      backgroundColor: colors.pureWhite,
      borderWidth: 1,
      borderRadius: normalize(12),
      borderColor: colors.borderColor,
      elevation: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      resizeMode: 'center',
      width: normalize(60, 'width'),
      height: normalize(60, 'height'),
    },
    medicineTextStyle: {
      ...fonts.bold,
      fontSize: normalize(18),
      color: colors.extraDarkBlue,
    },
    expiryTextStyle: {
      ...fonts.regular,
      fontSize: normalize(14),
      color: colors.grey,
    },
  });
