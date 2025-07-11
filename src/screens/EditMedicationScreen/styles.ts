import { StyleSheet } from 'react-native';
import { colors } from 'src/config/colors';
import { fonts } from 'src/config/fonts';
import normalize from 'src/config/normalize';

export const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: normalize(12),
      paddingVertical: normalize(16, 'height'),
    },
    boxContainer: {
      width: '100%',
      borderWidth: 1,
      borderRadius: normalize(12),
      paddingVertical: normalize(16, 'height'),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.lightBlue05,
      borderColor: colors.borderColor05,
      paddingHorizontal: normalize(12),
      justifyContent: 'space-between',
    },
    addMedicineStyle: {
      width: '100%',
      backgroundColor: colors.pureWhite,
      borderWidth: 2,
      elevation: 0,
      borderColor: colors.borderColor,
      borderStyle: 'dashed',
    },
    addMedicineLabelStyle: {
      ...fonts.medium,
      color: colors.pureBlack,
      fontSize: normalize(16),
    },
  });
