import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

export const styles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    backgroundColor: {
      backgroundColor:
        backgroundColor === 'white' ? colors.pureWhite : colors.offWhite,
      flex: 1,
    },
  });
