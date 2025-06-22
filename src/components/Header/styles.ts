import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      height: normalize(90, 'width'),
      borderBottomWidth: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.offWhite,
      borderColor: colors.borderColor,
      elevation: 10,
    },
    titleTextContainer: {
      ...fonts.medium,
      fontSize: normalize(20),
      color: colors.extraDarkBlue,
    },
  });
