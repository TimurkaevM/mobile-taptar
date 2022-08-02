import { StyleSheet, Pressable, View, Dimensions, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SocialAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '362743215061-epai7dqach8i9er5lced2fp00n8qj8j8.apps.googleusercontent.com',
    iosClientId:
      '362743215061-irlevnmlgr8g3a7udoq09srpt36cruvt.apps.googleusercontent.com',
    expoClientId:
      '362743215061-8favq054uvlgdind43ptmse8j2lop34t.apps.googleusercontent.com',
  });

  const handleOpenWithWebBrowser = async () => {
    const result = await WebBrowser.openBrowserAsync(
      `https://api.taptar.ru/api/oauth/vkontakte/redirect`,
    );
  };

  useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  console.log(accessToken);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти через</Text>
      <View style={styles.containerButtons}>
        {/* <a
          className={style.authIcon}
          href={`${process.env.REACT_APP_TEPTAR_HOST}/api/oauth/vkontakte/redirect`}
        > */}
        <Pressable onPress={handleOpenWithWebBrowser} style={styles.iconBtn}>
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
        {/* </a> */}
        {/* <a
          className={style.authIcon}
          href={`${process.env.REACT_APP_TEPTAR_HOST}/api/oauth/google/redirect`}
        > */}
        <Pressable
          onPress={() => {
            promptAsync({ useProxy: false, showInRecents: true });
          }}
          style={styles.iconBtn}
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
        {/* </a> */}
        {/* <a
          className={style.authIcon}
          href={`${process.env.REACT_APP_TEPTAR_HOST}/api/oauth/yandex/redirect`}
        > */}
        <Pressable onPress={handleOpenWithWebBrowser} style={styles.iconBtn}>
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
        {/* </a>     */}
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '400',
    textTransform: 'capitalize',
    fontSize: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    color: '#4686cc',
    fontFamily: 'GothamMedium',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 200,
    marginTop: 10,
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
