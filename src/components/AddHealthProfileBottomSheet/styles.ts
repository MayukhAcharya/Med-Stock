import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: colors.backgroundTransparent,
    },
    subContainer: {
      width: '100%',
      backgroundColor: colors.pureWhite,
      borderTopLeftRadius: normalize(12),
      borderTopRightRadius: normalize(12),
      paddingHorizontal: normalize(18),
      paddingVertical: normalize(16, 'height'),
    },
    addHealthProfileStyle: {
      ...fonts.medium,
      color: colors.pureBlack,
      fontSize: normalize(18),
    },
    inputContainer: {
      marginTop: normalize(15, 'height'),
      rowGap: normalize(25, 'height'),
    },
    addButtonMainStyle: {
      width: normalize(106),
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
  });
