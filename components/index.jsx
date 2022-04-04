import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Messenger from './Messenger';
import SendMaterial from './SendMaterial';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Profile from './Profile';
import { useDispatch } from 'react-redux';
import { getAllTags, getCauses } from '../redux/ducks/tags';

import { appStyles } from '../styles/appStyles';

function Main() {
  const Tab = createMaterialBottomTabNavigator();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getCauses());
  }, [dispatch]);

  return (
    <Tab.Navigator
      initialRouteName="SendMaterial"
      activeColor="#ffffff"
      shifting={true}
      barStyle={{ backgroundColor: '#4686cc' }}
    >
      <Tab.Screen
        name="SendMaterial"
        component={SendMaterial}
        options={{
          title: 'Отправить',
          tabBarLabel: 'Отправить',
          tabBarColor: '#4686cc',
          tabBarIcon: ({ color }) => (
            <Icon name="add" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Messenger"
        component={Messenger}
        options={{
          tabBarLabel: 'Чат',
          tabBarColor: '#4686cc',
          headerTitle: 'Чат',
          tabBarIcon: ({ color }) => (
            <Icon name="chat" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarColor: '#d13560',
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
