import { StyleSheet } from 'react-native';
import { ThemeColor } from 'src/config/theme';

export const styles = (colors: ThemeColor, backgroundColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundColor: {
      backgroundColor: backgroundColor === 'white' ? '#FFFFFF' : '#F6F8FA',
      flex: 1,
    },
  });
