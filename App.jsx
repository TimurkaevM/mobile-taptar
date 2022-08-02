import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/index'
import AppRoutes from './app/routes/AppRoutes';
import { NavigationContainer } from '@react-navigation/native';
import AudioProvider from './app/context/AudioProvider';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    'GothamMedium': require('./assets/GothamPro/gothampro_medium.ttf'),
    'GothamLight': require('./assets/GothamPro/gothampro_light.ttf'),
    'GothamBold': require('./assets/GothamPro/gothampro_bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.hideAsync();
    }
    if(fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AudioProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}
