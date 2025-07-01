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
      justifyContent: 'space-between',
    },
    inputContainer: {
      rowGap: normalize(16),
    },
    labelStyle: {
      color: colors.pureBlack,
      fontSize: normalize(14),
    },
    quantityUnitStyle: {
      ...fonts.regular,
      color: colors.extraDarkBlue,
      fontSize: normalize(16),
    },
    boxView: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.borderColor,
      backgroundColor: colors.borderColor,
      borderRadius: normalize(12),
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16),
    },
    boxHeaderText: {
      ...fonts.bold,
      color: colors.extraDarkBlue,
      fontSize: normalize(20),
    },
    boxDescriptionText: {
      ...fonts.regular,
      color: colors.extraDarkBlue,
      fontSize: normalize(15),
      textAlign: 'left',
    },
    editText: {
      ...fonts.medium,
      color: colors.primaryBlue,
      fontSize: normalize(15),
      textDecorationLine: 'underline',
      textDecorationColor: colors.primaryBlue,
    },
    noteTextStyle: {
      ...fonts.regular,
      color: colors.pureBlack,
      fontSize: normalize(15),
    },
    noteTextStyleBold: {
      ...fonts.bold,
      color: colors.pureBlack,
      fontSize: normalize(15),
    },
  });
