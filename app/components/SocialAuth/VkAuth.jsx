import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { authSocial } from '../../redux/ducks/user';
import { useDispatch } from 'react-redux';
import { api } from '../../api/api';

import { socialStyles } from '../../styles/socialStyles';

WebBrowser.maybeCompleteAuthSession();

export default function VkAuth({ navigate }) {
  const dispatch = useDispatch();

  let redirectUrl = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const getUserVk = async () => {
    try {
      let result = await AuthSession.startAsync({
        authUrl:
          'https://oauth.vk.com/authorize?client_id=8082215&scope=offline&display=mobile&redirect_uri=' +
          encodeURIComponent(redirectUrl) +
          '&response_type=token&v=5.92',
      });
      if (result.type === 'success') {
        let userInfoResponse = await api.post(
          '/mobile/oauth/vkontakte/callback',
          {
            token: result.params.access_token,
          },
        );

        const { message } = userInfoResponse.data;

        if (message.state) {
          navigate('SocialRegistrationScreen', { uuid: message.state });
        } else {
          dispatch(authSocial(message.access_token));
        }
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <Pressable onPress={getUserVk} style={socialStyles.iconBtn}>
      <Svg
        width="22"
        height="12"
        viewBox="0 0 22 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M0.385492 0.663474H4.21566C4.28825 0.663523 4.35928 0.684227 4.42022 0.723097C4.48115 0.761967 4.52939 0.817349 4.55914 0.882585C5.40114 2.7205 6.49398 4.4365 7.80737 5.98301C7.83244 6.02288 7.86816 6.05518 7.91062 6.07638C7.95308 6.09758 8.00064 6.10687 8.04809 6.10322C8.09555 6.09958 8.14107 6.08314 8.17968 6.05571C8.21829 6.02828 8.2485 5.99092 8.26699 5.94771C8.67101 4.97388 9.41605 2.62452 7.97417 0.95684C7.94403 0.922174 7.92254 0.881031 7.91145 0.836709C7.90036 0.792388 7.89996 0.746123 7.91029 0.701623C7.92062 0.657124 7.94139 0.615628 7.97094 0.580465C8.00049 0.545301 8.03798 0.517449 8.08043 0.49914C9.54083 -0.100981 10.9716 -0.188626 12.3616 0.424886C12.5047 0.488159 12.6264 0.590655 12.712 0.720154C12.7977 0.849653 12.8437 1.00069 12.8447 1.15526L13.1708 6.00492C13.1707 6.05613 13.1821 6.10673 13.2043 6.15303C13.2265 6.19933 13.2589 6.24017 13.2992 6.27259C13.3394 6.305 13.3865 6.32817 13.4369 6.34041C13.4874 6.35264 13.54 6.35364 13.5909 6.34333C15.1971 6.00736 16.1386 3.64217 17.0727 1.1723C17.1283 1.02275 17.2292 0.893682 17.3619 0.802646C17.4945 0.711609 17.6524 0.663017 17.814 0.663474H21.3439C21.4122 0.662476 21.4798 0.676186 21.5421 0.703645C21.6044 0.731105 21.6599 0.771649 21.7046 0.82244C21.7493 0.87323 21.7822 0.933039 21.801 0.997678C21.8198 1.06232 21.8241 1.13022 21.8134 1.19665C21.4811 2.95075 19.692 5.22343 18.7567 6.31533C18.5996 6.49821 18.5134 6.73004 18.5134 6.96962C18.5134 7.20921 18.5996 7.44103 18.7567 7.62391L21.9135 11.3281C21.9643 11.3877 21.9968 11.4604 22.0071 11.5375C22.0174 11.6147 22.0052 11.6931 21.9719 11.7637C21.9385 11.8342 21.8855 11.8939 21.8189 11.9358C21.7523 11.9777 21.675 12 21.596 12.0001H17.5879C17.4254 12.0002 17.2647 11.9672 17.1158 11.9031C16.967 11.839 16.8332 11.7452 16.723 11.6276L13.9295 9.33542C13.7837 9.1796 13.5106 9.12483 13.3735 9.28794C13.0275 9.70304 13.0547 10.2143 12.8904 11.3756C12.8619 11.5517 12.7698 11.7119 12.6312 11.8266C12.4925 11.9413 12.3165 12.0029 12.1355 12.0001H9.40369C9.01527 12.0016 8.6313 11.9185 8.27935 11.7566C6.71145 11.0262 2.42784 8.42854 0.0185367 1.16621C-0.000802525 1.10886 -0.00606424 1.04781 0.00318337 0.988073C0.012431 0.928332 0.0359243 0.871603 0.0717357 0.82254C0.107547 0.773478 0.154656 0.73348 0.209196 0.70583C0.263737 0.678179 0.324154 0.663663 0.385492 0.663474Z"
          fill="#BED1E6"
        />
      </Svg>
    </Pressable>
  );
}
