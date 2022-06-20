import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags, getCauses } from '../redux/ducks/tags';
import SendFocusedIcon from '../SvgIcons/MainroutesIcons/SendFocusedIcon';
import SendIcon from '../SvgIcons/MainroutesIcons/SendIcon';
import ContributionFocusedIcon from '../SvgIcons/MainroutesIcons/ContributionFocusedIcon';
import ContributionIcon from '../SvgIcons/MainroutesIcons/ContributionIcon';
import ChatFocusedIcon from '../SvgIcons/MainroutesIcons/ChatFocusedIcon';
import ChatIcon from '../SvgIcons/MainroutesIcons/ChatIcon';
import ProfileFocusedIcon from '../SvgIcons/MainroutesIcons/ProfileFocusedIcon';
import ProfileIcon from '../SvgIcons/MainroutesIcons/ProfileIcon';
import ContributionMediasRoutes from './ContributionMediasRoutes';
import SendMaterialScreen from '../screens/SendMaterialScreen';
import HistorianMaterialScreen from '../screens/HistorianMaterialScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactsScreen from '../screens/ContactsScreen';

function MainRoutes() {
  const Tab = createMaterialBottomTabNavigator();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const { role } = currentUser;

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getCauses());
  }, [dispatch]);

  return (
    <Tab.Navigator
      initialRouteName="SendMaterialScreen"
      activeColor="#ffffff"
      shifting={true}
      barStyle={{ backgroundColor: '#4686cc' }}
    >
      <Tab.Screen
        name="SendMaterialScreen"
        component={
          role === 'user' ? SendMaterialScreen : HistorianMaterialScreen
        }
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
        name="ContributionMediasRoutes"
        component={ContributionMediasRoutes}
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
        name="ContactsScreen"
        component={ContactsScreen}
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
        name="ProfileScreen"
        component={ProfileScreen}
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
