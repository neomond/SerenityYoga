import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCloseIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <Path
      stroke="#E5DEFF"
      strokeLinecap="round"
      strokeWidth={2}
      d="m16 8-8 8m0-8 8 8"
    />
  </Svg>
);
export default SvgCloseIcon;
