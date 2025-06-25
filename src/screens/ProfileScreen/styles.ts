import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(25, 'height'),
      justifyContent: 'space-between',
    },
    inputContainer: {
      rowGap: normalize(25),
    },
    labelStyle: {
      color: colors.pureBlack,
      fontSize: normalize(13),
    },
  });
