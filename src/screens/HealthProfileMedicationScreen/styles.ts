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
      backgroundColor: colors.pureWhite,
    },
    plusIconPressStyle: {
      width: normalize(56),
      height: normalize(56),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(28),
    },
    fabButtonStyle: {
      position: 'absolute',
      right: normalize(20),
      bottom: normalize(30),
      backgroundColor: colors.primaryBlue,
      width: normalize(65),
      height: normalize(65),
      borderRadius: normalize(65),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    fabButtonStyle2: {
      position: 'absolute',
      right: normalize(20),
      bottom: normalize(110),
      backgroundColor: colors.error,
      width: normalize(65),
      height: normalize(65),
      borderRadius: normalize(65),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    fabButtonTextStyle: {
      ...fonts.regular,
      color: colors.pureWhite,
      fontSize: normalize(14),
    },
  });
