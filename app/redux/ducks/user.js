import { api } from '../../api/api';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_START = 'user/login/start';
export const LOGIN_SUCCESS = 'user/login/success';
export const LOGIN_ERROR = 'user/login/error';
export const POST_LOGIN = 'user/login/post';
export const AUTH_START = 'user/auth/start';
export const AUTH_SUCCESS = 'user/auth/success';
export const AUTH_FINALLY = 'user/auth/finally';
export const CREATE_START = 'user/create/start';
export const CREATE_SUCCESS = 'user/create/success';
export const CREATE_ERROR = 'user/create/error';
export const LOGOUT = 'user/logout';
export const CHANGE_ERROR_LOGIN = 'error/change/login';
export const CHANGE_ERROR_CREATE = 'error/change/create';
export const AUTH_SOCIAL = 'user/auth/social';

const PROFILE__CHANGE__START = 'profile/change/start';
const PROFILE__CHANGE__SUCCESS = 'profile/change/success';

const PASS__CHANGE__START = 'pass/change/start';
const PASS__CHANGE__SUCCESS = 'pass/change/success';

const AVATAR__ADD__START = 'avatar/add/start';
const AVATAR__ADD__SUCCESS = 'avatar/add/success';
const AVATAR__ADD__PROGRESS = 'change/progress/avatar';

const initialState = {
  currentUser: {
    id: null,
    name: '',
    email: '',
    role: '',
    permissions: [],
    avatar: '',
  },
  isAuth: false,
  loading: false,
  loadingAuth: false,
  token: null,
  errorCreate: false,
  errorLogin: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      const decodeLogin = jwt_decode(action.payload.access_token);

      return {
        ...state,
        loading: false,
        token: action.payload.access_token,
        currentUser: {
          id: decodeLogin.user.id,
          name: decodeLogin.user.name,
          email: decodeLogin.user.email,
          role: decodeLogin.role[0],
          permissions: decodeLogin.permissions,
          avatar: decodeLogin.user.avatar,
        },
        isAuth: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorLogin: action.payload.message,
      };

    case AUTH_SOCIAL:
      const decodeSocial = jwt_decode(action.payload);

      return {
        ...state,
        loading: false,
        token: action.payload.access_token,
        currentUser: {
          id: decodeSocial.user.id,
          name: decodeSocial.user.name,
          email: decodeSocial.user.email,
          role: decodeSocial.role[0],
          permissions: decodeSocial.permissions,
          avatar: decodeSocial.user.avatar,
        },
        isAuth: true,
      };

    case AUTH_START:
      return {
        ...state,
        loadingAuth: true,
      };

    case AUTH_SUCCESS:
      const decodeAuth = jwt_decode(action.payload.access_token);

      return {
        ...state,
        loadingAuth: false,
        token: action.payload.access_token,
        currentUser: {
          id: decodeAuth.user.id,
          name: decodeAuth.user.name,
          email: decodeAuth.user.email,
          role: decodeAuth.role[0],
          permissions: decodeAuth.permissions,
          avatar: decodeAuth.user.avatar,
        },
        isAuth: true,
      };

    case AUTH_FINALLY:
      return {
        ...state,
        loadingAuth: false,
      };

    case CREATE_START:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SUCCESS:
      const decodeCreate = jwt_decode(action.payload.access_token);

      return {
        ...state,
        loading: false,
        token: action.payload.access_token,
        currentUser: {
          id: decodeCreate.user.id,
          name: decodeCreate.user.name,
          email: decodeCreate.user.email,
          role: decodeCreate.role[0],
          permissions: decodeCreate.permissions,
          avatar: decodeCreate.user.avatar,
        },
        isAuth: true,
      };

    case CREATE_ERROR:
      return {
        ...state,
        loading: false,
        errorCreate: action.payload.email[0],
      };

    case PROFILE__CHANGE__SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          name: action.payload.name,
          email: action.payload.email,
        },
        message: action.data,
      };

    case AVATAR__ADD__START:
      return {
        ...state,
        loading: true,
      };

    case AVATAR__ADD__SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload.message,
        },
        message: action.payload.message,
      };

    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        currentUser: {
          id: null,
          name: '',
          email: '',
          role: '',
          permissions: [],
          avatar: '',
        },
        isAuth: false,
        token: null,
      };

    case CHANGE_ERROR_LOGIN:
      return {
        ...state,
        errorLogin: null,
      };

    case CHANGE_ERROR_CREATE:
      return {
        ...state,
        errorCreate: null,
      };

    default:
      return state;
  }
}

export const auth = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: AUTH_START,
      });

      if (value !== null) {
        const response = await api.get('/auth', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: AUTH_SUCCESS,
          payload: response.data,
        });
        AsyncStorage.setItem('token', response.data.access_token);
      }
    } catch (e) {
      dispatch({
        type: AUTH_FINALLY,
      });
      console.error(e);
      AsyncStorage.removeItem('token');
    }
  };
};

export const authSocial = (token) => {
  AsyncStorage.setItem('token', token);

  return {
    type: AUTH_SOCIAL,
    payload: token,
  };
};

export const registration = (name, email, password, password_confirmation) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_START,
    });

    api
      .post('/register', {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CREATE_SUCCESS,
          payload: data,
        });
        AsyncStorage.setItem('token', data.access_token);
      })
      .catch((e) => {
        dispatch({
          type: CREATE_ERROR,
          payload: e.response.data.errors,
        });
        console.error(e.response.data);
      });
  };
};

export const registrationSocial = (
  name,
  email,
  password,
  password_confirmation,
  uuid,
) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_START,
    });

    api
      .post('/oauth/register', {
        name,
        email,
        password,
        password_confirmation,
        uuid,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CREATE_SUCCESS,
          payload: data,
        });
        AsyncStorage.setItem('token', data.access_token);
      })
      .catch((e) => {
        dispatch({
          type: CREATE_ERROR,
          payload: e.response.data,
        });
        console.error(e.response.data);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_START,
      email,
      password,
    });

    api
      .post('/login', {
        email,
        password,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
        AsyncStorage.setItem('token', data.access_token);
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: e.response.data,
        });
        console.log(e.response.data);
      });
  };
};

export const changeUserProfile = (name, email) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: PROFILE__CHANGE__START });

      if (value !== null) {
        const response = await api.post(
          '/user/profile',
          {
            name,
            email,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: PROFILE__CHANGE__SUCCESS,
          data: response.data,
          payload: { name, email },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeUserPass = (newPass, checkPass, oldPass) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: PASS__CHANGE__START });

      if (value !== null) {
        const response = await api.post(
          '/user/profile/password',
          {
            password: newPass,
            password_confirmation: checkPass,
            old_password: oldPass,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: PASS__CHANGE__SUCCESS,
          data: response.data,
        });
        console.log(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const addAvatar = (file) => {
  const form = new FormData();
  form.append('photo', {
    uri: file[0].uri,
    name: file[0].filename,
    type: 'image/jpeg',
  });

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: AVATAR__ADD__START });

      if (value !== null) {
        const response = await api.post('/user/profile/upload/avatar', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: AVATAR__ADD__PROGRESS,
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: AVATAR__ADD__SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const addAvatarIos = (file) => {
  const form = new FormData();
  form.append('photo', {
    uri: file[0].uri,
    name: '1de34e9a-2542-4e17-950d-0f7c044699ec.jpg',
    type: 'image/jpeg',
  });

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: AVATAR__ADD__START });

      if (value !== null) {
        const response = await api.post('/user/profile/upload/avatar', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: AVATAR__ADD__PROGRESS,
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: AVATAR__ADD__SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

export const ChangeErrorLogin = () => {
  return {
    type: CHANGE_ERROR_LOGIN,
  };
};

export const ChangeErrorCreate = () => {
  return {
    type: CHANGE_ERROR_CREATE,
  };
};
