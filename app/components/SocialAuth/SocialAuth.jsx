import { View, Text } from 'react-native';
import VkAuth from './VkAuth';
import GoogleAuth from './GoogleAuth';
import YandexAuth from './YandexAuth';

import { socialStyles } from '../../styles/socialStyles';

export default function SocialAuth({ navigate }) {
  return (
    <View style={socialStyles.container}>
      <Text style={socialStyles.title}>Войти через</Text>
      <View style={socialStyles.containerButtons}>
        <VkAuth navigate={navigate} />
        <GoogleAuth navigate={navigate} />
        <YandexAuth navigate={navigate} />
      </View>
    </View>
  );
}
