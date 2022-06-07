import Svg, { Path, G, Circle } from 'react-native-svg';
import React from 'react';

const AvatarAddIcon = () => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    space="preserve"
    width={40}
    height={40}
    version="1.1"
    viewBox="0 0 23.12 23.12"
    xlink="http://www.w3.org/1999/xlink"
    xodm="http://www.corel.com/coreldraw/odm/2003"
  >
    <G id="Слой_x0020_1">
      <Circle
        fill="none"
        fillRule="nonzero"
        cx="11.56"
        cy="11.56"
        r="11.56"
      />
      <Path
        fill="#fff"
        fillRule="nonzero"
        d="M11.56 4.11l0 0c0.72,0 1.3,0.59 1.3,1.3l0 4.84 4.84 0c0.72,0 1.3,0.59 1.3,1.3l0 0c0,0.72 -0.59,1.3 -1.3,1.3l-4.84 0 0 4.84c0,0.72 -0.59,1.3 -1.3,1.3l-0 0c-0.72,0 -1.3,-0.59 -1.3,-1.3l0 -4.84 -4.84 0c-0.72,0 -1.3,-0.59 -1.3,-1.3l0 -0c0,-0.72 0.59,-1.3 1.3,-1.3l4.84 0 0 -4.84c0,-0.72 0.59,-1.3 1.3,-1.3z"
      />
    </G>
  </Svg>
  );
};

export default AvatarAddIcon;
