import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHomeIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    // fill="none"
    {...props}>
    <Path
      strokeWidth={2}
      d="M6.239 4.594c1.864-1.628 2.796-2.442 3.845-2.752a5 5 0 0 1 2.832 0c1.049.31 1.98 1.124 3.845 2.752l2.5 2.182c1.008.88 1.512 1.32 1.874 1.852a5 5 0 0 1 .702 1.546c.163.622.163 1.29.163 2.629V16c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185C18.2 24 16.8 24 14 24H9c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 20.2 1 18.8 1 16v-3.197c0-1.338 0-2.007.163-2.63a5 5 0 0 1 .702-1.545c.362-.532.866-.972 1.874-1.852l2.5-2.182Z"
    />
  </Svg>
);
export default SvgHomeIcon;
