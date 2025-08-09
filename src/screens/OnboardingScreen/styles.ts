import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    titleStyle: {
      ...fonts.semiBold,
      fontSize: normalize(25),
      color: colors.pureBlack,
    },
    subTitleStyles: {
      ...fonts.regular,
      fontSize: normalize(18),
      color: colors.pureBlack,
    },
    container: {
      paddingHorizontal: normalize(16),
    },
    lottieStyle: {
      width: normalize(300, 'width'),
      height: normalize(300, 'height'),
    },
    paddingBottom: {
      paddingBottom: normalize(30, 'height'),
    },
    skipButtonTextStyle: {
      ...fonts.medium,
      fontSize: normalize(16),
      color: colors.pureBlack,
    },
    skipButtonStyle: {
      paddingVertical: normalize(20),
      paddingHorizontal: normalize(12),
      backgroundColor: colors.pureWhite,
      borderTopRightRadius: normalize(30),
      borderBottomRightRadius: normalize(30),
      alignItems: 'center',
      width: '43%',
    },
    nextButtonStyle: {
      paddingVertical: normalize(20),
      paddingHorizontal: normalize(12),
      backgroundColor: colors.pureWhite,
      borderTopLeftRadius: normalize(30),
      borderBottomLeftRadius: normalize(30),
      alignItems: 'center',
      width: '43%',
    },
    doneButtonStyle: {
      paddingVertical: normalize(20),
      paddingHorizontal: normalize(12),
      backgroundColor: colors.grey,
      borderTopLeftRadius: normalize(30),
      borderBottomLeftRadius: normalize(30),
      alignItems: 'center',
      width: '53%',
    },
    doneButtonTextStyle: {
      ...fonts.medium,
      fontSize: normalize(16),
      color: colors.pureWhite,
    },
  });
