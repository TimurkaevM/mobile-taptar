import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContributionAudioScreen from '../screens/ContributionAudioScreen';
import ContributionVideoScreen from '../screens/ContributionVideoScreen';
import ContributionDocumentScreen from '../screens/ContributionDocumentScreen';
import ContributionPhotoScreen from '../screens/ContributionPhotoScreen';
import ContributionMaterialScreen from '../screens/ContributionMaterialScreen';
import AudioIcon from '../SvgIcons/ContributionIcons/AudioIcon';
import AudioFocusedIcon from '../SvgIcons/ContributionIcons/AudioFocusedIcon';
import VideoFocusedIcon from '../SvgIcons/ContributionIcons/VideoFocusedIcon';
import VideoIcon from '../SvgIcons/ContributionIcons/VideoIcon';
import MaterialFocusedIcon from '../SvgIcons/ContributionIcons/MaterialFocusedIcon';
import MaterialIcon from '../SvgIcons/ContributionIcons/MaterialIcon';
import PhotoFocusedIcon from '../SvgIcons/ContributionIcons/PhotoFocusedIcon';
import PhotoIcon from '../SvgIcons/ContributionIcons/PhotoIcon';
import DocumentFocusedIcon from '../SvgIcons/ContributionIcons/DocumentFocusedIcon';
import DocumentIcon from '../SvgIcons/ContributionIcons/DocumentIcon';

function ContributionMediasRoutes() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="ContributionMaterialScreen"
      screenOptions={{
        swipeEdgeWidth: 0,
        swipeEnabled: false,
        drawerType: 'front',
        drawerActiveTintColor: '#7d7d7d',
        drawerActiveBackgroundColor: '#f5f5f5',
        drawerContentStyle: {
          backgroundColor: '#fafafa',
        },
      }}
    >
      <Drawer.Screen
        name="ContributionMaterialScreen"
        component={ContributionMaterialScreen}
        options={{
          title: 'Материал',
          drawerIcon: ({ focused, color }) =>
            focused ? (
              <MaterialFocusedIcon color={color} />
            ) : (
              <MaterialIcon size={22} color={color} />
            ),
        }}
      />
      <Drawer.Screen
        name="ContributionPhotoScreen"
        component={ContributionPhotoScreen}
        options={{
          title: 'Фото',
          drawerIcon: ({ focused, color }) =>
            focused ? (
              <PhotoFocusedIcon color={color} />
            ) : (
              <PhotoIcon size={22} color={color} />
            ),
        }}
      />
      <Drawer.Screen
        name="ContributionDocumentScreen"
        component={ContributionDocumentScreen}
        options={{
          title: 'Документ',
          drawerIcon: ({ focused, color }) =>
            focused ? (
              <DocumentFocusedIcon color={color} />
            ) : (
              <DocumentIcon size={22} color={color} />
            ),
        }}
      />
      <Drawer.Screen
        name="ContributionVideoScreen"
        component={ContributionVideoScreen}
        options={{
          title: 'Видео',
          drawerIcon: ({ focused, color }) =>
            focused ? (
              <VideoFocusedIcon color={color} />
            ) : (
              <VideoIcon size={22} color={color} />
            ),
        }}
      />
      <Drawer.Screen
        name="ContributionAudioScreen"
        component={ContributionAudioScreen}
        options={{
          title: 'Аудио',
          drawerIcon: ({ focused, color }) =>
            focused ? (
              <AudioFocusedIcon color={color} />
            ) : (
              <AudioIcon size={22} color={color} />
            ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default ContributionMediasRoutes;
