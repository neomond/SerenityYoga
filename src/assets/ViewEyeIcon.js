import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgViewEye = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#585858"
      fillRule="evenodd"
      d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#585858"
      fillRule="evenodd"
      d="M21.83 11.28C19.542 7.153 15.812 5 12 5c-3.812 0-7.542 2.152-9.83 6.28a1.376 1.376 0 0 0-.01 1.308C4.412 16.8 8.163 19 12 19c3.837 0 7.588-2.199 9.84-6.412a1.376 1.376 0 0 0-.01-1.307ZM12 17c-2.939 0-5.96-1.628-7.908-5.051C6.069 8.596 9.073 7 12 7c2.927 0 5.931 1.596 7.908 4.949C17.96 15.372 14.94 17 12 17Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgViewEye;
