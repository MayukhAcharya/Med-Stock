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
  });
