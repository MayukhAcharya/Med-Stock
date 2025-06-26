import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      height: normalize(90, 'width'),
      borderBottomWidth: 1,
      justifyContent: 'center',
      backgroundColor: colors.offWhite,
      borderColor: colors.borderColor,
      elevation: 10,
      width: '100%',
    },
    titleTextContainer: {
      ...fonts.medium,
      fontSize: normalize(20),
      color: colors.extraDarkBlue,
    },
    headerView: {
      marginTop: normalize(25, 'height'),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    side: {
      width: normalize(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: {
      flex: 1,
      alignItems: 'center',
    },
    placeholder: {
      width: normalize(60),
    },
  });
