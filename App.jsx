import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/index'
import AppRoutes from './app/routes/AppRoutes';
import { NavigationContainer } from '@react-navigation/native';
import AudioProvider from './app/context/AudioProvider';

export default function App() {
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
