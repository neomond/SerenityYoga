import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
const SvgLogo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={63}
    height={57}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h63v57H0z" />
      <Path
        fill="url(#b)"
        d="M36.63 55.432a.915.915 0 0 1-.942.969l-17.823-.567A18.558 18.558 0 0 1 .068 39.806.464.464 0 0 1 .5 39.28l16.775-1.008c10.084-.606 18.75 7.076 19.355 17.16Z"
      />
      <Path
        fill="url(#c)"
        d="M61.79 10.896a.338.338 0 0 0-.327-.348c-13.25-.414-24.328 9.992-24.742 23.243l-.703 22.47c13.437.42 24.67-10.133 25.09-23.57l.682-21.795Z"
      />
      <Path
        fill="url(#d)"
        d="M5.914 14.332a1.232 1.232 0 0 0-.99 1.61l.961 2.866a26.355 26.355 0 0 0 18.34 17.127l8.459 2.206c.73.19 1.444-.36 1.447-1.114.055-14.131-12.475-25.002-26.458-22.953l-1.76.258Z"
      />
      <Path
        fill="url(#e)"
        d="M34.984.696a.821.821 0 0 0-1.255.11l-1.154 1.652a17.57 17.57 0 0 0-1.892 16.621l2.176 5.406a.77.77 0 0 0 1.171.333c7.59-5.58 8.439-16.607 1.79-23.282l-.836-.84Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={19.467}
        x2={18.31}
        y1={50.758}
        y2={31.5}
        gradientUnits="userSpaceOnUse">
        <Stop />
        <Stop offset={1} stopColor="#080808" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={374.578}
        x2={373.126}
        y1={-270.58}
        y2={-224.118}
        gradientUnits="userSpaceOnUse">
        <Stop />
        <Stop offset={1} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={-56.318}
        x2={-26.104}
        y1={-1.796}
        y2={-8.729}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#080808" />
        <Stop offset={0.906} stopColor="#080808" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={18.918}
        x2={34.626}
        y1={-39.037}
        y2={-25.607}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#080808" />
        <Stop offset={0.906} stopColor="#080808" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h63v57H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgLogo;
