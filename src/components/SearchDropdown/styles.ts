import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize, { height, width } from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: width / 3,
      backgroundColor: colors.backgroundTransparent,
      alignItems: 'center',
    },
    dropdownMainStyle: {
      borderColor: colors.borderColor,
      borderWidth: 1,
      backgroundColor: colors.pureWhite,
      maxHeight: normalize(358, 'height'),
      borderRadius: normalize(12),
      elevation: 5,
      zIndex: 1,
      width: normalize(328, 'width'),
      paddingVertical: normalize(16, 'height'),
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
    crossIconStyle: {
      width: normalize(30),
      height: normalize(30),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.error,
      borderRadius: normalize(30),
      marginBottom: normalize(26, 'height'),
    },
  });
