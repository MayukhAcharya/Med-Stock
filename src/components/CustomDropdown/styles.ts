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
  });
