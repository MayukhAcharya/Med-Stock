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
      paddingVertical: normalize(25, 'height'),
      backgroundColor: colors.pureWhite,
      borderTopLeftRadius: normalize(12),
      borderTopRightRadius: normalize(12),
    },
    addNewItemTextStyle: {
      ...fonts.bold,
      fontSize: normalize(23),
      color: colors.pureBlack,
    },
    addAnotherButton: {
      width: '100%',
      backgroundColor: colors.offWhite,
      elevation: 0,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    addAnotherButtonLabelStyle: {
      ...fonts.medium,
      fontSize: normalize(16),
      color: colors.pureBlack,
    },
    hzLine: {
      borderBottomColor: colors.borderColor,
      borderBottomWidth: 1,
      marginTop: normalize(15, 'height'),
    },
    paddingH: {
      paddingHorizontal: normalize(16),
    },
  });
