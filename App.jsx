import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/index'
import AppRoutes from './AppRoutes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
       <AppRoutes />
      </NavigationContainer>
    </Provider>
  );
}
