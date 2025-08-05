import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.borderColor05,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16, 'height'),
      borderRadius: normalize(12),
      backgroundColor: colors.lightBlue05,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      resizeMode: 'cover',
      width: normalize(75, 'width'),
      height: normalize(75, 'height'),
      borderRadius: normalize(12),
    },
    medicineNameTextStyle: {
      ...fonts.bold,
      fontSize: normalize(22),
      color: colors.extraDarkBlue,
    },
    quantityTextStyle: {
      ...fonts.regular,
      fontSize: normalize(15),
      color: colors.grey,
    },
    expiresTextStyle: {
      ...fonts.regular,
      fontSize: normalize(15),
      color: colors.grey,
    },
    dateTextStyle: {
      ...fonts.medium,
      fontSize: normalize(15),
      color: colors.pureBlack,
    },
    unrequiredTextStyle: {
      ...fonts.regular,
      fontSize: normalize(15),
      color: colors.error,
    },
  });
