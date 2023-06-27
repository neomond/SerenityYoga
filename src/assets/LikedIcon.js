import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLiked = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={20}
    fill="none"
    {...props}>
    <Path
      // stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.86 6.09c0 .42-.03.83-.08 1.22a3.714 3.714 0 0 0-4.46 1.18C13.64 7.59 12.56 7 11.34 7c-2.05 0-3.71 1.67-3.71 3.74 0 2.68 1.42 4.73 3 6.12-.05.03-.1.04-.15.06-.3.11-.8.11-1.1 0C6.79 16.03 1 12.35 1 6.09 1 3.33 3.22 1.1 5.96 1.1c1.63 0 3.07.78 3.97 1.99A4.957 4.957 0 0 1 13.9 1.1c2.74 0 4.96 2.23 4.96 4.99Z"
    />
    <Path
      // stroke="#292D32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 10.74c0 4.68-4.33 7.44-6.27 8.1-.23.08-.6.08-.83 0-.83-.28-2.1-.95-3.27-1.98-1.58-1.39-3-3.44-3-6.12C7.63 8.67 9.29 7 11.34 7c1.22 0 2.3.59 2.98 1.49a3.714 3.714 0 0 1 4.46-1.18C20.09 7.89 21 9.2 21 10.74Z"
    />
  </Svg>
);
export default SvgLiked;
