import { StyleSheet } from 'react-native';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    smallFab: {
      position: 'absolute',
      right: 23,
      bottom: 30,
      backgroundColor: '#007AFF',
      width: 45,
      height: 45,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });
