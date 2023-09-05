import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgPlayRoad = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#815cff"
    {...props}>
    <Path
      stroke="#E5DEFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M4 12V8.44c0-4.42 3.13-6.23 6.96-4.02l3.09 1.78 3.09 1.78c3.83 2.21 3.83 5.83 0 8.04l-3.09 1.78-3.09 1.78C7.13 21.79 4 19.98 4 15.56V12Z"
    />
  </Svg>
);
export default SvgPlayRoad;
