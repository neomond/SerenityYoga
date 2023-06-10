import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgDownload = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}>
    <Path fill="#4a4a4a" d="M11 3.013a1 1 0 0 1 2-.007l-2 .007Z" />
    <Path
      fill="#4a4a4a"
      d="m14.316 10.295-1.29 1.297L13 3.006l-2 .007.027 8.585L9.73 10.31a1 1 0 1 0-1.41 1.42l.003.002 3.716 3.693 3.682-3.705.005-.006h.001v-.002l.007-.005v-.001l-1.418-1.41Z"
    />
    <Path fill="#4a4a4a" d="M15.734 11.705a1 1 0 0 0-1.418-1.41l1.418 1.41Z" />
    <Path
      fill="#4a4a4a"
      d="M4 12a2 2 0 0 1 2-2 1 1 0 0 0 0-2 4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h11a5 5 0 0 0 5-5v-5a4 4 0 0 0-4-4 1 1 0 1 0 0 2 2 2 0 0 1 2 2v5a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2v-6Z"
    />
  </Svg>
);
export default SvgDownload;
