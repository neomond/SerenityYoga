import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMeditations = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      //   stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 9.86v4.29M9 8.43v7.14M12 7v10M15 8.43v7.14M18 9.86v4.29M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
    />
  </Svg>
);
export default SvgMeditations;
