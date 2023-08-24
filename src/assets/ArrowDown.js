import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgArrDown = props => (
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
      d="m18 8-5.772 6.734a.3.3 0 0 1-.456 0L6 8"
    />
  </Svg>
);
export default SvgArrDown;
