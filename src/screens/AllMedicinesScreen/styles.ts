import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(12),
      paddingTop: normalize(16, 'height'),
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 30,
      backgroundColor: '#007AFF',
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });
