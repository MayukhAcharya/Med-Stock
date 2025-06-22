import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';

export const styles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundColor: {
      backgroundColor:
        backgroundColor === 'white' ? colors.pureWhite : colors.offWhite,
      flex: 1,
    },
  });
