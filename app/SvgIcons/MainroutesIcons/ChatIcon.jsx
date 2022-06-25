import Svg, { Path, G } from 'react-native-svg';
import { Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const ChatIcon = ({ color }) => {
  const count = useSelector((state) => state.contacts.countNewChat);

  return (
    <View style={{ flexDirection: 'column' }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        width={24}
        height={24}
        version="1.1"
        viewBox="0 0 95.29 112.25"
        xlink="http://www.w3.org/1999/xlink"
        xodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Path
            fill={color}
            d="M15.12 96.51c2.1,-7.84 3.03,-11.54 4.54,-19.17 -7.89,-7.44 -12.82,-17.99 -12.82,-29.69 0,-22.53 18.27,-40.8 40.8,-40.8 22.53,0 40.8,18.27 40.8,40.8 0,22.53 -18.27,40.8 -40.8,40.8 -5.87,0 -11.46,-1.24 -16.5,-3.48 -6.59,4.77 -8.99,6.45 -16.02,11.54zm-2.92 -17.04l-0.28 2.15 -7.64 30.63 27.29 -19.75c5.02,1.8 10.43,2.78 16.08,2.78 26.31,0 47.64,-21.33 47.64,-47.64 0,-26.31 -21.33,-47.64 -47.64,-47.64 -26.31,0 -47.64,21.33 -47.64,47.64 0,12.24 4.61,23.39 12.19,31.83zm14.74 -50.53l43.02 0c1.95,0 3.55,1.6 3.55,3.55l0 0c0,1.95 -1.59,3.55 -3.55,3.55l-43.02 0c-1.95,0 -3.55,-1.6 -3.55,-3.55l0 -0c0,-1.95 1.59,-3.55 3.55,-3.55zm0 14.76l43.02 0c1.95,0 3.55,1.6 3.55,3.55l0 0c0,1.95 -1.59,3.55 -3.55,3.55l-43.02 0c-1.95,0 -3.55,-1.6 -3.55,-3.55l0 -0c0,-1.95 1.59,-3.55 3.55,-3.55zm-0 14.45l18.5 0c1.95,0 3.55,1.6 3.55,3.55l0 0c0,1.95 -1.6,3.55 -3.55,3.55l-18.5 0c-1.95,0 -3.55,-1.6 -3.55,-3.55l0 -0c0,-1.95 1.6,-3.55 3.55,-3.55z"
          />
        </G>
      </Svg>
      {count > 0 ? (
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 7,
            backgroundColor: '#00ff0a',
            position: 'absolute',
            bottom: 3,
            right: 2,
          }}
        ></View>
      ) : null}
      {/* {count > 0 ? <Text numberOfLines={1} style={{color: '#fff', alignSelf: 'flex-end', marginBottom: 2, fontSize: 12}}>+{count}2</Text> : null} */}
    </View>
  );
};

export default ChatIcon;
