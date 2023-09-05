import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgPauseRoad = props => (
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
      strokeWidth={1.5}
      d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89v14.22C3 20.46 3.57 21 5.01 21h3.63c1.44 0 2.01-.54 2.01-1.89ZM21 19.11V4.89C21 3.54 20.43 3 18.99 3h-3.63c-1.43 0-2.01.54-2.01 1.89v14.22c0 1.35.57 1.89 2.01 1.89h3.63c1.44 0 2.01-.54 2.01-1.89Z"
    />
  </Svg>
);

export default SvgPauseRoad;
