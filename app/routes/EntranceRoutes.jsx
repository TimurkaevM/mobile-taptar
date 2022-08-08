import { createStackNavigator } from '@react-navigation/stack';
import SocialRegistrationScreen from '../screens/SocialRegistrationScreen';
import EntranceMainRoutes from './EntranceMainRoutes';

const Stack = createStackNavigator();

function ContentRoutes() {
  return (
    <Stack.Navigator initialRouteName="EntranceMainRoutes">
      <Stack.Screen
        name="EntranceMainRoutes"
        component={EntranceMainRoutes}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SocialRegistrationScreen"
        component={SocialRegistrationScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ContentRoutes;
