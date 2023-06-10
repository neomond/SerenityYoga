import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="m9 8-4 4m0 0 4 4m-4-4h14"
    />
  </Svg>
);
export default SvgBack;
