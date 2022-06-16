import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagsScreen from '../screens/AddTagsScreen';
import ChangeTagsScreen from '../screens/ChangeTagsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import FormSend from '../screens/SendMaterialScreen';
import ImageBrowserScreen from '../screens/ImageBrowserScreen';
import AudioListScreen from '../screens/AudioListScreen';
import PdfReaderScreen from '../screens/PdfReaderScreen';
import { getDraftFiles } from '../redux/actions/material';
import { getAllTags, getCauses } from '../redux/ducks/tags';
import SendMaterialScreen from '../screens/SendMaterialScreen';

const Stack = createStackNavigator();

function SendMaterialRoutes() {
  // const dispatch = useDispatch();

  // const draftError = useSelector((state) => state.sendMaterial.draftError);

  // useEffect(() => {
  //   dispatch(getDraftFiles());
  // }, [dispatch, draftError]);

  // useEffect(() => {
  //   dispatch(getAllTags());
  //   dispatch(getCauses());
  // }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="SendMaterialScreen">
      <Stack.Screen
        name="SendMaterialScreen"
        component={SendMaterialScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SendMaterialRoutes;
