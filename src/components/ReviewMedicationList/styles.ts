import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize, { width } from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.backgroundTransparent,
      paddingTop: width / 3,
      alignItems: 'center',
      flex: 1,
    },
    crossIconStyle: {
      width: normalize(30),
      height: normalize(30),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.error,
      borderRadius: normalize(30),
      marginBottom: normalize(26, 'height'),
    },
    subContainer: {
      width: normalize(300, 'width'),
      backgroundColor: colors.pureWhite,
      borderRadius: normalize(12),
      paddingHorizontal: normalize(12),
      paddingTop: normalize(14, 'height'),
      paddingBottom: normalize(25, 'height'),
      alignItems: 'center',
    },
    reviewMedicineTextStyle: {
      ...fonts.regular,
      color: colors.pureBlack,
      fontSize: normalize(14),
    },
    flatlistContainer: {
      width: normalize(250, 'width'),
      borderWidth: 1,
      borderColor: colors.borderColor,
      marginTop: normalize(15, 'height'),
      borderRadius: normalize(8),
      maxHeight: normalize(250, 'height'),
    },
    flatlistHeaderContainer: {
      flexDirection: 'row',
      paddingHorizontal: normalize(10),
      backgroundColor: colors.pureWhite,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
      borderTopLeftRadius: normalize(8),
      borderTopRightRadius: normalize(8),
      width: '100%',
    },
    tableColumn: {
      width: '25%',
      justifyContent: 'center',
      height: normalize(35, 'height'),
    },
    flatlistInnerContainer: {
      flexDirection: 'row',
      backgroundColor: colors.pureWhite,
      paddingHorizontal: normalize(10),
      borderBottomLeftRadius: normalize(10),
      borderBottomRightRadius: normalize(10),
      alignItems: 'center',
    },
    flatlistHeaderTextStyle: {
      ...fonts.bold,
      color: colors.pureBlack,
      fontSize: normalize(16),
    },
    flatlistTextStyle: {
      ...fonts.regular,
      color: colors.pureBlack,
      fontSize: normalize(16),
    },
    emptyFieldTextStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: normalize(60, 'height'),
    },
    noMedsTextStyle: {
      ...fonts.regular,
      color: colors.pureBlack,
      fontSize: normalize(16),
    },
  });
