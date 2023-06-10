import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgProfile = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} {...props}>
    <Path
      strokeWidth={2}
      d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 19.5a6.5 6.5 0 0 1 6.5-6.5h1a6.5 6.5 0 0 1 6.5 6.5v.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-.5Z"
    />
  </Svg>
);
export default SvgProfile;
