import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/index'
import AppRoutes from './app/routes/AppRoutes';
import { NavigationContainer } from '@react-navigation/native';
import AudioProvider from './app/context/AudioProvider';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    'GothamMedium': require('./assets/GothamPro/gothampro_medium.ttf'),
    'GothamLight': require('./assets/GothamPro/gothampro_light.ttf'),
    'GothamBold': require('./assets/GothamPro/gothampro_bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
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
