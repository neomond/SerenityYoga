import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCloseTrack = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#E5DEFF"
    {...props}>
    <Path
      stroke="#815cff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.17 14.83 5.66-5.66M14.83 14.83 9.17 9.17M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
    />
  </Svg>
);
export default SvgCloseTrack;
