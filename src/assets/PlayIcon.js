import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgPlay = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#E5DEFF"
      strokeLinecap="round"
      strokeWidth={2}
      d="M7 8.7v6.6c0 1.526 1.638 2.49 2.971 1.749l-.485-.874.485.874 5.941-3.3c1.372-.763 1.372-2.735 0-3.497l-5.94-3.3C8.637 6.21 7 7.174 7 8.7Z"
    />
  </Svg>
);
export default SvgPlay;
