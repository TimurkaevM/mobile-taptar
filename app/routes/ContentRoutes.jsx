import React, { useEffect } from 'react';
import AddTagsScreen from '../screens/AddTagsScreen';
import ChangeTagsScreen from '../screens/ChangeTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
import AudioListScreen from '../screens/AudioListScreen';
import MainRoutes from './MainRoutes';
import MaterialInfoScreen from '../screens/MaterialInfoScreen';
import FileTagsScreen from '../screens/FileTagsScreen';
import FileInfoScreen from '../screens/FileInfoScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileChangeScreen from '../screens/ProfileChangeScreen';
import ChangeHistorianTagsScreen from '../screens/ChangeHistorianTagsScreen';
import { useSelector, useDispatch } from 'react-redux';
import ImageBrowserIosScreen from '../screens/ImageBrowserIosScreen';
import VideoBrowserScreen from '../screens/VideoBrowserScreen';
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
import { loadCountNewChat, plusCountMessages } from '../redux/ducks/contacts';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function ContentRoutes() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const roomId = useSelector((state) => state.messages.room?.id);
  const token = useSelector((state) => state.user.token);

  const { role, id } = currentUser;

  let echo = new Echo({
    broadcaster: 'socket.io',
    host: 'https://api.taptar.ru',
    client: socketio,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    echo
      .private(`notification.${id}`)
      .listen('.received.message', function (e) {
        console.log(roomId);
        console.log(e);
        if (parseInt(roomId) === e.roomId) return;
        dispatch(plusCountMessages(e));
      });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(loadCountNewChat());
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="MainRoutes">
      <Stack.Screen
        name="MainRoutes"
        component={MainRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ImageBrowserScreen"
        component={
          Platform.OS === 'ios' ? ImageBrowserIosScreen : ImageBrowserScreen
        }
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoBrowserScreen"
        component={VideoBrowserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ModalAddFile"
        component={AddTagsScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeTagsScreen"
        component={
          role === 'user' ? ChangeTagsScreen : ChangeHistorianTagsScreen
        }
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AudioListScreen"
        component={AudioListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MaterialInfoScreen"
        component={MaterialInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileTagsScreen"
        component={FileTagsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileInfoScreen"
        component={FileInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileChangeScreen"
        component={ProfileChangeScreen}
        options={{
          title: 'Редактировать профиль',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#4686cc',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default ContentRoutes;
