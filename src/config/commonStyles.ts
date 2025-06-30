import { StyleSheet } from 'react-native';

import normalize from 'src/config/normalize';

export const commonStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

  col: {
    flexDirection: 'column',
  },

  wrap: {
    flexWrap: 'wrap',
  },

  textAlignCenter: {
    textAlign: 'center',
  },

  textAlignLeft: {
    textAlign: 'left',
  },

  aic: {
    alignItems: 'center',
  },

  alignItemsLeft: {
    alignItems: 'flex-start',
  },
  alignItemsRight: {
    alignItems: 'flex-end',
  },
  alignItemCenter: {
    alignItems: 'center',
  },

  spaceAround: {
    justifyContent: 'space-around',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  justifyCenter: {
    justifyContent: 'center',
  },
  justifyFlexEnd: {
    justifyContent: 'flex-end',
  },
  opacity0: {
    opacity: 0,
  },
  ml0: {
    marginLeft: normalize(0),
  },
  ml6: {
    marginLeft: normalize(6),
  },
  ml10: {
    marginLeft: normalize(10),
  },
  ml13: {
    marginLeft: normalize(13),
  },
  ml15: {
    marginLeft: normalize(15),
  },
  ml17: {
    marginLeft: normalize(17),
  },
  ml20: {
    marginLeft: normalize(20),
  },
  ml24: {
    marginLeft: normalize(24),
  },
  ml30: {
    marginLeft: normalize(30),
  },
  ml35: {
    marginLeft: normalize(35),
  },
  ml40: {
    marginLeft: normalize(40),
  },
  ml45: {
    marginLeft: normalize(45),
  },
  w60: {
    width: normalize(60, 'width'),
  },
  w81: {
    width: normalize(81, 'width'),
  },
  w113: {
    width: normalize(113, 'width'),
  },
  w102: {
    width: normalize(102, 'width'),
  },
  w120: {
    width: normalize(120, 'width'),
  },
  w132: {
    width: normalize(132, 'width'),
  },
  w138: {
    width: normalize(138, 'width'),
  },
  w144: {
    width: normalize(144, 'width'),
  },
  w149: {
    width: normalize(149, 'width'),
  },
  w150: {
    width: normalize(150, 'width'),
  },
  w153: {
    width: normalize(153, 'width'),
  },
  w160: {
    width: normalize(160, 'width'),
  },
  w164: {
    width: normalize(164, 'width'),
  },
  w180: {
    width: normalize(180, 'width'),
  },
  w200: {
    width: normalize(200, 'width'),
  },
  w210: {
    width: normalize(210, 'width'),
  },
  w218: {
    width: normalize(218, 'width'),
  },
  w268: {
    width: normalize(268, 'width'),
  },
  w284: {
    width: normalize(284, 'width'),
  },
  w292: {
    width: normalize(292, 'width'),
  },
  w296: {
    width: normalize(296, 'width'),
  },
  w302: {
    width: normalize(302, 'width'),
  },
  w308: {
    width: normalize(308, 'width'),
  },
  w330: {
    width: normalize(330, 'width'),
  },
  w93Per: {
    width: '93%',
  },
  h33: {
    height: normalize(33),
  },
  mH700: {
    maxHeight: normalize(700),
  },
  h37: {
    height: normalize(37),
  },
  h39: {
    height: normalize(39),
  },
  mt5: {
    marginTop: normalize(5, 'height'),
  },
  mt8: {
    marginTop: normalize(8),
  },
  mt10: {
    marginTop: normalize(10, 'height'),
  },
  mt12: {
    marginTop: normalize(12),
  },
  mt16: {
    marginTop: normalize(16),
  },
  mt18: {
    marginTop: normalize(18, 'height'),
  },
  mt20: {
    marginTop: normalize(20),
  },
  mt23: {
    marginTop: normalize(23),
  },
  mt25: {
    marginTop: normalize(25, 'height'),
  },
  mt30: {
    marginTop: normalize(30, 'height'),
  },
  mt38: {
    marginTop: normalize(38, 'height'),
  },
  mt43: {
    marginTop: normalize(43, 'height'),
  },
  mt59: {
    marginTop: normalize(59, 'height'),
  },
  mr10: {
    marginRight: normalize(10),
  },
  mr16: {
    marginRight: normalize(16),
  },
  mr20: {
    marginRight: normalize(20),
  },
  mr26: {
    marginRight: normalize(26),
  },
  mr30: {
    marginRight: normalize(30),
  },
  mr38: {
    marginRight: normalize(38),
  },
  mr40: {
    marginRight: normalize(40),
  },
  mr45: {
    marginRight: normalize(45),
  },
  mb9: {
    marginBottom: normalize(9),
  },
  mb17: {
    marginBottom: normalize(17),
  },
  mb26: {
    marginBottom: normalize(26),
  },
  zIndexN1: {
    zIndex: -1,
  },
  zIndexN2: {
    zIndex: -2,
  },
  w5Per: {
    width: '5%',
  },
  w8Per: {
    width: '8%',
  },
  w10Per: {
    width: '10%',
  },
  w13Per: {
    width: '13%',
  },
  w14Per: {
    width: '14%',
  },

  w15Per: {
    width: '15%',
  },
  w16Per: {
    width: '16%',
  },
  w17Per: {
    width: '17%',
  },

  w18Per: {
    width: '18%',
  },
  w19Per: {
    width: '19%',
  },
  w26Per: {
    width: '26%',
  },
  w25Per: {
    width: '25%',
  },
  w20Per: {
    width: '20%',
  },
  w22Per: {
    width: '22%',
  },
  w23Per: {
    width: '23%',
  },
  w24Per: {
    width: '24%',
  },
  w27Per: {
    width: '27%',
  },
  w233Per: {
    width: '23.3%',
  },
  w30Per: {
    width: '30%',
  },
  w35Per: {
    width: '35%',
  },
  w38Per: {
    width: '38%',
  },
  w40Per: {
    width: '40%',
  },
  w45Per: {
    width: '45%',
  },
  w50Per: {
    width: '50%',
  },
  w55Per: {
    width: '55%',
  },
  w75per: {
    width: '75%',
  },
  w77Per: {
    width: '77%',
  },
  w80per: {
    width: '80%',
  },
  w100per: {
    width: '100%',
  },
  w12Per: {
    width: '12%',
  },
  w28Per: {
    width: '28%',
  },
  h45: {
    height: normalize(45, 'height'),
  },
  mb3: {
    marginBottom: normalize(3, 'height'),
  },
  rowGap6: {
    rowGap: normalize(6),
  },
});
