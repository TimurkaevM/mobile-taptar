import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Messenger from '../screens/ChatScreen';
import SendMaterial from './SendMaterialRoutes';
import { useDispatch } from 'react-redux';
import { getAllTags, getCauses } from '../redux/ducks/tags';
import ContributionRoutes from './ContributionRoutes';
import SendFocusedIcon from '../SvgIcons/MainroutesIcons/SendFocusedIcon';
import SendIcon from '../SvgIcons/MainroutesIcons/SendIcon';
import ContributionFocusedIcon from '../SvgIcons/MainroutesIcons/ContributionFocusedIcon';
import ContributionIcon from '../SvgIcons/MainroutesIcons/ContributionIcon';
import ChatFocusedIcon from '../SvgIcons/MainroutesIcons/ChatFocusedIcon';
import ChatIcon from '../SvgIcons/MainroutesIcons/ChatIcon';
import ProfileFocusedIcon from '../SvgIcons/MainroutesIcons/ProfileFocusedIcon';
import ProfileIcon from '../SvgIcons/MainroutesIcons/ProfileIcon';
import ContributionMediasRoutes from './ContributionMediasRoutes';
import ProfileRoutes from './ProfileRoutes';
import ChatRoutes from './ChatRoutes';

function MainRoutes() {
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
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <SendFocusedIcon color={color} />
            ) : (
              <SendIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ContributionRoutes"
        component={ContributionRoutes}
        options={{
          tabBarLabel: 'Мой кабинет',
          tabBarColor: '#4686cc',
          headerTitle: 'Чат',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <ContributionFocusedIcon color={color} />
            ) : (
              <ContributionIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ChatRoutes"
        component={ChatRoutes}
        options={{
          tabBarLabel: 'Чат',
          tabBarColor: '#4686cc',
          headerTitle: 'Чат',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <ChatFocusedIcon color={color} />
            ) : (
              <ChatIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ProfileRoutes"
        component={ProfileRoutes}
        options={{
          tabBarColor: '#4686cc',
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <ProfileFocusedIcon color={color} />
            ) : (
              <ProfileIcon color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainRoutes;
