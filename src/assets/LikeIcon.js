import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLikeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}>
    <Path
      // stroke="#fff"
      strokeWidth={1.5}
      d="m4.426 12.947 5.736 6.175a2.508 2.508 0 0 0 3.676 0l5.736-6.175c1.901-2.047 1.901-5.365 0-7.412-1.901-2.047-4.984-2.047-6.886 0a.94.94 0 0 1-1.377 0c-1.9-2.047-4.984-2.047-6.885 0-1.901 2.047-1.901 5.365 0 7.412Z"
    />
  </Svg>
);
export default SvgLikeIcon;
