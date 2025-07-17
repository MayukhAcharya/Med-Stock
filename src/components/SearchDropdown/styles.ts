import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize, { height } from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    dropdownMainStyle: {
      borderColor: colors.borderColor,
      borderWidth: 1,
      right: 0,
      position: 'absolute',
      left: 0,
      top: normalize(64, 'height'),
      backgroundColor: colors.pureWhite,
      maxHeight: height / 2,
      borderRadius: normalize(12),
      elevation: 5,
      zIndex: 1,
    },
    secondInputStyle: {
      width: normalize(300, 'width'),
    },
    flatlistView: {
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16, 'height'),
      borderBottomWidth: 1,
      borderColor: colors.borderColor,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    itemLabelStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.pureBlack,
    },
    inputStyle: {
      height: normalize(40, 'height'),
    },
    emptyFieldStyle: {
      height: normalize(90, 'height'),
      justifyContent: 'center',
      alignItems: 'center',
      padding: normalize(12),
    },
    noFindTextStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.pureBlack,
    },
    addHereTextStyle: {
      ...fonts.regular,
      fontSize: normalize(16),
      color: colors.primaryBlue,
      textDecorationLine: 'underline',
    },
  });
