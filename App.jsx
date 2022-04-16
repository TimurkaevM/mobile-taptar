import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/index'
import AppRoutes from './AppRoutes';
import { NavigationContainer } from '@react-navigation/native';
import AudioListItem from './components/SendMaterial/AudioListScreen/components/AudioListItem';
import { View } from 'react-native';

export default function App() {
  // return (
  //   <Provider store={store}>
  //     <NavigationContainer>
  //      <AppRoutes />
  //     </NavigationContainer>
  //   </Provider>
  // );
  return (
    <View style={{marginTop: 50}}>
      <AudioListItem />
    </View>
  );
}
