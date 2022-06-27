import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';

const PdfReader = ({ path, navigate }) => {
  const handleOpenWithWebBrowser = async () => {
    const result = await WebBrowser.openBrowserAsync(
      `https://api.taptar.ru/storage/${path}`,
    );
  };

  return (
    <Pressable onPress={handleOpenWithWebBrowser} style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        space="preserve"
        version="1.1"
        viewBox="0 0 58.88 84.18"
        xmxlink="http://www.w3.org/1999/xlink"
        xmxodm="http://www.corel.com/coreldraw/odm/2003"
      >
        <G id="Слой_x0020_1">
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M17.38 63.38l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M41.5 67.43l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M26.4 7.09l4.78 0c0,-0.05 0,-0.1 0,-0.15 0,-1.32 -1.07,-2.39 -2.39,-2.39 -1.32,0 -2.39,1.07 -2.39,2.39 0,0.05 0,0.1 0,0.15zm-4.55 0c-0,-0.05 -0,-0.1 -0,-0.15 0,-3.83 3.11,-6.94 6.94,-6.94 3.83,0 6.94,3.11 6.94,6.94 0,0.05 -0,0.1 -0,0.15l1.77 0c2.13,0 3.88,1.75 3.88,3.88l0 11.68 -24.85 0 0 -11.68c0,-2.13 1.74,-3.88 3.88,-3.88l1.44 0zm-0.91 11.12l16.45 0 0 -5.27c0,-1 -0.82,-1.82 -1.82,-1.82l-12.8 0c-1.01,0 -1.83,0.82 -1.83,1.83l0 5.26z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M10.22 16.52c-3.12,0 -5.67,2.55 -5.67,5.67l0 51.76c0,3.12 2.55,5.67 5.67,5.67l38.44 0c3.12,0 5.67,-2.55 5.67,-5.67l0 -51.76c0,-3.12 -2.55,-5.67 -5.67,-5.67l-3.89 0 0 -4.55 3.89 0c5.62,0 10.22,4.6 10.22,10.22l0 51.76c0,5.62 -4.6,10.22 -10.22,10.22l-38.44 0c-5.62,0 -10.22,-4.6 -10.22,-10.22l0 -51.76c0,-5.62 4.6,-10.22 10.22,-10.22l2.91 0 0 4.55 -2.91 0z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M17.38 44.78l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M41.5 48.83l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
          <Path
            fill="#BED1E6"
            fillRule="nonzero"
            d="M41.5 30.58l-24.12 0c-1.33,0 -2.42,1.09 -2.42,2.42 0,1.33 1.09,2.42 2.42,2.42l24.12 0c1.33,0 2.42,-1.09 2.42,-2.42 0,-1.33 -1.09,-2.42 -2.42,-2.42z"
          />
        </G>
      </Svg>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 200,
  },
});
export default PdfReader;
