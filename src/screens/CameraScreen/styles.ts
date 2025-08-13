import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    noCameraStyle: {
      flex: 1,
      backgroundColor: colors.pureBlack,
    },
    shutterIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginRight: normalize(90),
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      justifyContent: 'center',
      width: '100%',
      height: normalize(95),
      backgroundColor: colors.backgroundTransparent,
    },
  });
