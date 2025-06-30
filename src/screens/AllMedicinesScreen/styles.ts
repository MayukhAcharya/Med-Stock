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
    plusIconStyle: {
      backgroundColor: colors.primaryBlue,
      alignItems: 'center',
      justifyContent: 'center',
      width: normalize(30),
      height: normalize(30),
      borderRadius: normalize(30),
    },
    instructionTextStyle: {
      ...fonts.regular,
      fontSize: normalize(20),
      color: colors.pureBlack,
    },
  });
