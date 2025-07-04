import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(25, 'height'),
    },
    inputContainer: {
      rowGap: normalize(16),
    },
    labelStyle: {
      color: colors.pureBlack,
      fontSize: normalize(14),
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
    quantityUnitStyle: {
      ...fonts.regular,
      color: colors.extraDarkBlue,
      fontSize: normalize(16),
    },
    editText: {
      ...fonts.medium,
      color: colors.primaryBlue,
      fontSize: normalize(15),
      textDecorationLine: 'underline',
      textDecorationColor: colors.primaryBlue,
    },
    buttonView: {
      marginTop: normalize(30, 'height'),
      rowGap: normalize(15),
    },
    notRequiredStyle: {
      width: '100%',
      backgroundColor: colors.pureWhite,
      borderWidth: 1,
      borderColor: colors.error,
      elevation: 0,
    },
    notRequiredLabelStyle: {
      ...fonts.medium,
      color: colors.pureBlack,
      fontSize: normalize(15),
    },
  });
