import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    mainContainer: {
      width: normalize(295, 'width'),
    },
    labelViewStyle: {
      justifyContent: 'flex-start',
    },
    labelTextStyle: {
      ...fonts.regular,
      fontSize: normalize(13),
      color: colors.grey,
    },
    textInputStyle: {
      borderWidth: 1,
      borderColor: colors.stroke,
      marginTop: normalize(5),
      borderRadius: normalize(10),
      height: normalize(46, 'height'),
      flexDirection: 'row',
    },
    textInputError: {
      borderWidth: 1,
      borderColor: colors.error,
      marginTop: normalize(5),
      borderRadius: normalize(10),
      height: normalize(46, 'height'),
      flexDirection: 'row',
    },
    mainTextStyle: {
      ...fonts.regular,
      paddingVertical: normalize(9),
      paddingHorizontal: normalize(17),
      flex: 7,
      fontSize: normalize(14),
      textAlignVertical: 'center',
      color: colors.pureBlack,
    },
    rightContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: normalize(15),
      marginRight: normalize(12),
    },
  });
