import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';

import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    buttonDisableStyle: {
      width: normalize(295, 'width'),
      height: normalize(46, 'height'),
      backgroundColor: colors.primaryBlue,
      borderRadius: normalize(10),
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.5,
    },
    buttonStyle: {
      width: normalize(295, 'width'),
      height: normalize(46, 'height'),
      backgroundColor: colors.primaryBlue,
      borderRadius: normalize(10),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 6,
    },
    buttonLabelStyle: {
      ...fonts.medium,
      fontSize: normalize(14),
      color: colors.pureWhite,
    },
  });
