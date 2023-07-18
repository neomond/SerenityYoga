import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSetting = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M19 22V11M19 7V2M12 22v-5M12 13V2M5 22V11M5 7V2M3 11h4M17 11h4M10 13h4"
    />
  </Svg>
);
export default SvgSetting;
