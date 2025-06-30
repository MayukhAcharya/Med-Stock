import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 30,
      backgroundColor: colors.primaryBlue,
      width: normalize(56),
      height: normalize(56),
      borderRadius: normalize(28),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    smallFab: {
      position: 'absolute',
      right: 27,
      bottom: 30,
      backgroundColor: colors.primaryBlue,
      width: normalize(45),
      height: normalize(45),
      borderRadius: normalize(28),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    plusIconPressStyle: {
      width: normalize(56),
      height: normalize(56),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(28),
    },
    smallIconsPressStyle: {
      width: normalize(45),
      height: normalize(45),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(28),
    },
  });
