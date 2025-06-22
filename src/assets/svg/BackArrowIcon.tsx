import Svg, { Path } from 'react-native-svg';

export const BackArrowIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19M5 12L9 16M5 12L9 8"
        stroke="#1A1C1E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
