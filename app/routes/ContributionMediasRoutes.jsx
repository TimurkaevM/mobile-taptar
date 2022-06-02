import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { getReadyMaterial } from '../redux/ducks/contributionMaterial';
import { getPhoto } from '../redux/ducks/contributionPhoto';
import { getDocument } from '../redux/ducks/contributionDocument';
import { getVideo } from '../redux/ducks/contributionVideo';
import { getAudio } from '../redux/ducks/contributionAudio';

function ContributionMediasRoutes() {
  const Tab = createMaterialTopTabNavigator();

  const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

  const dispatch = useDispatch();
  
  React.useEffect(() => {
  dispatch(getReadyMaterial());
  dispatch(getPhoto());
  dispatch(getVideo());
  dispatch(getDocument());
  dispatch(getAudio());
}, [dispatch]);

  return (
    <Tab.Navigator
      initialRouteName="ContributionMaterialScreen"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: '#7d7d7d',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'capitalize' },
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderWidth: 0,
          marginTop: STATUS_BAR_HEIGHT,
        },
        tabBarItemStyle: {
          flexDirection: 'row',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#bed1e6',
          height: 4,
        },
      }}
    >
      <Tab.Screen
        name="ContributionMaterialScreen"
        component={ContributionMaterialScreen}
        options={{
          tabBarLabel: 'Материал',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialFocusedIcon color={color} />
            ) : (
              <MaterialIcon size={22} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ContributionPhotoScreen"
        component={ContributionPhotoScreen}
        options={{
          tabBarLabel: 'Фото',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <PhotoFocusedIcon color={color} />
            ) : (
              <PhotoIcon size={22} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ContributionDocumentScreen"
        component={ContributionDocumentScreen}
        options={{
          tabBarLabel: 'документы',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <DocumentFocusedIcon color={color} />
            ) : (
              <DocumentIcon size={22} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ContributionVideoScreen"
        component={ContributionVideoScreen}
        options={{
          tabBarLabel: 'Видео',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <VideoFocusedIcon color={color} />
            ) : (
              <VideoIcon size={22} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ContributionAudioScreen"
        component={ContributionAudioScreen}
        options={{
          tabBarLabel: 'Аудио',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <AudioFocusedIcon color={color} />
            ) : (
              <AudioIcon color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default ContributionMediasRoutes;
