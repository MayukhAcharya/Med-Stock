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
      flexDirection: 'row',
    },
    imageWidth: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      width: normalize(250),
      height: normalize(100),
      borderWidth: 2,
      borderColor: colors.borderColor,
      borderRadius: normalize(10),
    },
    boxView: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flashIcon: {
      justifyContent: 'center',
      marginLeft: normalize(55),
    },
  });
