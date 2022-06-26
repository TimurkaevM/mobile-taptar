import Svg, { Path } from 'react-native-svg';
import React from 'react';

const SearchIcon = ({ color }) => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.45402 4.35994C6.45402 5.84619 5.24389 7.05616 3.75743 7.05616C2.27098 7.05616 1.06085 5.84619 1.06085 4.35994C1.06085 2.87369 2.27098 1.66373 3.75743 1.66373C5.24389 1.66373 6.45402 2.87369 6.45402 4.35994ZM9.15696 8.99654L6.76529 6.6052C7.24807 5.95735 7.51169 5.16658 7.51169 4.35994C7.51169 2.28935 5.82831 0.606201 3.75743 0.606201C1.68656 0.606201 0 2.28935 0 4.35994C0 6.43053 1.68338 8.11368 3.75743 8.11368C4.35773 8.11368 4.95168 7.9676 5.48846 7.68813L7.97541 10.1747C8.13422 10.3304 8.34385 10.4193 8.56619 10.4193C8.78852 10.4193 8.99815 10.3335 9.15696 10.1747C9.31577 10.016 9.40152 9.80954 9.40152 9.58406C9.40152 9.36176 9.31577 9.15215 9.15696 8.99337V8.99654Z"
        fill="#878787"
      />
    </Svg>
  );
};

export default SearchIcon;
