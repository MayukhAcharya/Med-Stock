import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(16),
      paddingVertical: normalize(25, 'height'),
    },
    userWelcomeStyle: {
      ...fonts.semiBold,
      fontSize: normalize(25),
      color: colors.extraDarkBlue,
    },
    detailTextStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.extraDarkBlue,
    },
    MedsView: {
      flexDirection: 'row',
      marginTop: normalize(30, 'height'),
      columnGap: normalize(8),
      alignItems: 'center',
    },
    safeTextStyle: {
      ...fonts.semiBold,
      fontSize: normalize(22),
      color: colors.green,
    },
    totalMedsTextStyle: {
      ...fonts.semiBold,
      fontSize: normalize(22),
      color: colors.extraDarkBlue,
    },
    nearExpiryTextStyle: {
      ...fonts.semiBold,
      fontSize: normalize(22),
      color: colors.darkYellow,
    },
    expiredTextStyle: {
      ...fonts.semiBold,
      fontSize: normalize(22),
      color: colors.error,
    },
    addButtonLabelStyle: {
      fontSize: normalize(14),
    },
    noMedicinesTextStyle: {
      ...fonts.medium,
      fontSize: normalize(22),
      color: colors.extraDarkBlue,
    },
    getStartedTextStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.grey,
      textAlign: 'center',
    },
    emptyStyle: {
      width: normalize(300, 'width'),
      height: normalize(300, 'height'),
    },
  });
