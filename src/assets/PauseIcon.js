import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';
const SvgPause = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Rect
      width={4}
      height={10}
      x={6}
      y={7}
      stroke="#E5DEFF"
      strokeWidth={2}
      rx={2}
    />
    <Rect
      width={4}
      height={10}
      x={14}
      y={7}
      stroke="#E5DEFF"
      strokeWidth={2}
      rx={2}
    />
  </Svg>
);
export default SvgPause;
