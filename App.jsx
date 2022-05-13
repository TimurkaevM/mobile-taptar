import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/index'
import AppRoutes from './app/routes/AppRoutes';
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
