import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { authSocial } from '../../redux/ducks/user';
import { useDispatch } from 'react-redux';
import { api } from '../../api/api';

import { socialStyles } from '../../styles/SocialStyles';

WebBrowser.maybeCompleteAuthSession();

export default function YandexAuth({ navigate }) {
  const dispatch = useDispatch();

  let redirectUrl = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const getUserYandex = async () => {
    try {
      let result = await AuthSession.startAsync({
        authUrl:
          'https://oauth.yandex.ru/authorize?response_type=token&client_id=da01c894a748447cafbad3e7d117543c&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      });

      if (result.type === 'success') {
        let userInfoResponse = await api.post('/mobile/oauth/yandex/callback', {
          token: result.params.access_token,
        });

        const { message } = userInfoResponse.data;

        if (message.state) {
          navigate('SocialRegistrationScreen', { uuid: message.state });
        } else {
          dispatch(authSocial(message.access_token));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={getUserYandex} style={socialStyles.iconBtn}>
      <Svg
        width="11"
        height="16"
        viewBox="0 0 11 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M11 16H8.10694V2.1658H6.81814C4.45576 2.1658 3.21832 3.30782 3.21832 5.01256C3.21832 6.94665 4.07181 7.84277 5.83748 8.98478L7.29257 9.93291L3.11072 15.9976H0L3.76367 10.5831C1.59938 9.08881 0.381502 7.62997 0.381502 5.16861C0.381502 2.09251 2.5996 0 6.79858 0H10.9804V15.9953H11V16Z"
          fill="#BED1E6"
        />
      </Svg>
    </Pressable>
  );
}
