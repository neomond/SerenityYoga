import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgActivity = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16} // Original width
    height={16} // Original height
    fill="#d9d9d9"
    {...props}>
    <G transform="scale(0.5)">
      <Path
        // stroke="#815cff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
    </G>
  </Svg>
);

export default SvgActivity;
