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
    },
    inputContainer: {
      marginTop: normalize(15, 'height'),
      rowGap: normalize(20, 'height'),
    },
    addButtonMainStyle: {
      width: normalize(96),
      marginTop: normalize(18, 'height'),
    },
    reviewMedicinesMainStyle: {
      width: '100%',
      backgroundColor: colors.pureWhite,
      elevation: 0,
      borderWidth: 1,
      borderColor: colors.primaryBlue,
    },
    reviewMedicinesLabelStyle: {
      color: colors.extraDarkBlue,
      ...fonts.medium,
    },
    totalQuantityTextStyle: {
      ...fonts.regular,
      color: colors.extraDarkBlue,
      fontSize: normalize(14),
    },
    labelStyle: {
      color: colors.pureBlack,
      fontSize: normalize(13),
    },
    duplicateMedicineTextStyle: {
      ...fonts.regular,
      fontSize: normalize(13),
      color: colors.error,
    },
    boxContainer: {
      width: '100%',
      borderWidth: 1,
      paddingVertical: normalize(15, 'height'),
      paddingHorizontal: normalize(10),
      borderColor: colors.borderColor,
      borderRadius: normalize(12),
      backgroundColor: colors.offWhite,
      rowGap: normalize(10),
    },
    errorText: {
      ...fonts.regular,
      color: colors.error,
      fontSize: normalize(14),
    },
  });
