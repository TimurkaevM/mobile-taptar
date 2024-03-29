import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { authSocial } from '../../redux/ducks/user';
import { useDispatch } from 'react-redux';
import { api } from '../../api/api';

import { socialStyles } from '../../styles/socialStyles';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth({ navigate }) {
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '165633612064-hh5rn46veedd94e1ptqdftqt6026e29g.apps.googleusercontent.com',
    iosClientId:
      '165633612064-0c5nkc5mc6en8at88r6diottmf2lrc0u.apps.googleusercontent.com',
    expoClientId:
      '165633612064-7nrn6gifcfmc31jd98pr1rba5775cgf3.apps.googleusercontent.com',
    webClientId:
      '165633612064-7nrn6gifcfmc31jd98pr1rba5775cgf3.apps.googleusercontent.com',
  });

  useEffect(() => {
    async function getUserData(token) {
      let userInfoResponse = await api.post('/mobile/oauth/google/callback', {
        token,
      });

      const { message } = userInfoResponse.data;

      if (message.state) {
        navigate('SocialRegistrationScreen', { uuid: message.state });
      } else {
        dispatch(authSocial(message.access_token));
      }
    }
    if (response?.type === 'success') {
      const { authentication } = response;

      getUserData(authentication.accessToken);
    }
  }, [response]);

  return (
    <Pressable
      onPress={() => {
        promptAsync();
      }}
      style={socialStyles.iconBtn}
    >
      <Svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#BED1E6"
          d="M7.6417 6.39377C7.6417 6.44199 7.6417 6.48217 7.6417 6.52074C7.6417 7.49636 7.6417 9.60833 7.6417 9.60833H11.7331C11.7331 9.92979 11.3735 11.2044 10.23 12.0193C9.56642 12.4743 8.79726 12.7326 8.00443 12.7666C7.44479 12.8076 6.88277 12.7384 6.34756 12.5625C5.49004 12.2682 4.73396 11.7172 4.17306 10.9778C3.61215 10.2384 3.27109 9.34306 3.19215 8.40287C3.15 7.91853 3.18165 7.43027 3.2859 6.95632C3.79157 4.62736 5.89877 2.90114 8.31643 3.27403C9.39232 3.43476 10.0071 3.90569 10.5635 4.40717L12.7906 2.07339C12.3691 1.68485 11.9155 1.33631 11.435 1.03187C10.3324 0.362166 9.08121 0.0063847 7.80616 0C7.56024 0 7.3174 0.0128583 7.07455 0.0225019C6.64823 0.0449438 6.22532 0.113895 5.8127 0.228234C4.19395 0.640554 2.75109 1.60125 1.70896 2.96061C0.691972 4.25788 0.0984671 5.86132 0.0152115 7.53654C-0.0297597 8.25945 0.0251107 8.98537 0.178131 9.69191C0.570914 11.6201 1.63813 13.3254 3.17063 14.4736C4.35929 15.3882 5.78022 15.9144 7.25438 15.986C8.09828 16.0367 8.94457 15.9494 9.76273 15.7273C11.2659 15.3471 12.596 14.4323 13.5253 13.1395C14.9085 11.2108 15.2467 8.7404 14.8378 6.38894L7.6417 6.39377Z"
        />
      </Svg>
    </Pressable>
  );
}
