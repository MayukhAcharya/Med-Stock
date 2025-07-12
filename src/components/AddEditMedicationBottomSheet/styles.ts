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
    HeaderTextStyle: {
      ...fonts.medium,
      color: colors.pureBlack,
      fontSize: normalize(18),
    },
    inputContainer: {
      marginTop: normalize(30, 'height'),
      rowGap: normalize(30, 'height'),
    },
    bottomContainerMargin: {
      marginTop: normalize(30, 'height'),
    },
  });
