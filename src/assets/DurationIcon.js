import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgDuration = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path fill="url(#a)" d="M0 0h20v20H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01389)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAC+UlEQVR4AezZA4+cURSA4UW5qh3UcdKgtm39itpBbbsNakyD2rYVp/baNt5aZ3QHZ77NvMkT597N2fkcEixYsGDBggVztfLy8kgMxFzsw0O8Rzx+Fov3uI/dmI1+qFlZh9IY03EbhTCtADcwGQ0qw2B64wyK4e2KcBLdrDiYPrgLf3UDPawwmKY4Aq0OoFGgDmciMqFdOsYE0mCqYwfcKRE2TMFgtEbjf07qrTEYU2BDItxpM6ppDycG1+FKKdiCDh7s1wFbkAJXuoIoreE0wnM4KxZTEeHFvSMwFbFw1hM0UPjlOB1OEVYh0sc3natQ5MKQov15zrkGR71EOz/+w9rhJRx12S/nJBdOyMcQrXDIR+MYHLXF13/EBDhqJ8IVLxrh2AlHjfXV5k2Q4Wg4IQGSkyGlo7EvNj3s5LAKC6ABhTk53A764KFTjl56es4R1lzgpXPSS0iVoac3B3QbUkXy1UppQPLVrQhSt7w1nJ4Qo1UhpD0gJ2uvghj18MYGpyEVi0gLDCgSsZA65Y3HiWJITQ0hhQGZrD8VUsVo6IuFUxBhoQFFIAVSUzxZ+Kb5HanugIQ9tkDqpidTL4RUBwsOqAOkChFhsuAASCUg1IIDCkUCpPqbLDgPUrYQUh2Q+T42SM01WWwvpKZYeEBTILXHZLF7kBpk4QENgtQ9k8XeQ6q1hQfUGlLvTRZLhlQ9Cw+oHqSSTRYrgFQ1Cw+oGqQKrDagdRYYkOIhRmRDM4VDLEBP0nLZmItquidp/cv8MLx18tZyoMJlXu9GUdivBhYgH2J0Ai30bhQVHjWEfVviFOQYIBaiht6jhsHDqsJh9x6jdR5WDV53KB52F9HWv687DF6YKR92hVhq+sJM4ZWrymG3VuGVq8FLe53D7jOi/PvS3uCzj+JhN07hs4/Bh0OdQXVR/XBY0c4dEwAAwCAM868aVPRLbKysPz13+tNzFC/0+nhB/iKgCkyCJ+KUAfeE5KYIxiwZcyiDOpPMnlGvWbjHAl5TAAAHI6LF9MjvF1wAAAAASUVORK5CYII="
        id="b"
        width={72}
        height={72}
      />
    </Defs>
  </Svg>
);
export default SvgDuration;
