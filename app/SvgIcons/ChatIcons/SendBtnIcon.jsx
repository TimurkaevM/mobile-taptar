import Svg, { Path } from 'react-native-svg';
import React from 'react';

const SendBtnIcon = ({ color }) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8411 19.1496L18.3944 0.688124L0.000267744 7.94738L0.293293 8.23038L8.55124 11.4033L11.8411 19.1496Z"
        fill="#878787"
      />
    </Svg>
  );
};

export default SendBtnIcon;
