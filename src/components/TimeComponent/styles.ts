import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import normalize, { width } from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.backgroundTransparent,
      alignItems: 'center',
      flex: 1,
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
    calendarStyle: {
      width: normalize(328, 'width'),
      borderRadius: normalize(12),
      backgroundColor: colors.pureWhite,
    },
  });
