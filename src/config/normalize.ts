import { PixelRatio, Dimensions, Platform } from 'react-native';

export const { height, width } = Dimensions.get('window');
export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');
export const os = Platform.OS;

// figma design scale
const wscale: number = SCREEN_WIDTH / 360;
const hscale: number = SCREEN_HEIGHT / 800;

function normalize(size: number, based: 'width' | 'height' = 'height') {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default normalize;
