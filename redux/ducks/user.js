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
export const CHANGE_ERROR = 'error/change';

const MASTER__CHECK__START = 'master/check/start';
const MASTER__CHECK__SUCCESS = 'master/check/success';
const MASTER__ADD__START = 'master/add/start';
const MASTER__ADD__SUCCESS = 'master/add/success';
const MASTER__REMOVE__START = 'master/remove/start';
const MASTER__REMOVE__SUCCESS = 'master/remove/success';

const initialState = {
  currentUser: {},
  isAuth: false,
  loading: false,
  loadingAuth: false,
  master: false,
  message: '',
  error: '',
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
        currentUser: decodeLogin,
        isAuth: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        currentUser: decodeAuth,
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
        currentUser: decodeCreate,
        isAuth: true,
      };

    case CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };

    case CHANGE_ERROR:
      return {
        ...state,
        error: null,
      };

    case MASTER__CHECK__START:
      return {
        ...state,
        loading: true,
      };

    case MASTER__CHECK__SUCCESS:
      return {
        ...state,
        loading: false,
        master: action.payload.message,
      };

    case MASTER__ADD__START:
      return {
        ...state,
        loading: true,
      };

    case MASTER__ADD__SUCCESS:
      return {
        ...state,
        loading: false,
        master: true,
        message: action.payload.message,
      };

    case MASTER__REMOVE__START:
      return {
        ...state,
        loading: true,
      };

    case MASTER__REMOVE__SUCCESS:
      return {
        ...state,
        loading: false,
        master: false,
        message: action.payload.message,
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
          payload: e.response.data.message,
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
        console.error(e.response.data);
      });
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

export const ChangeError = () => {
  return {
    type: CHANGE_ERROR,
  };
};

//saga
// export const loginUserStart = () => {
//   return { type: LOGIN_START };
// };

// export const loginUserSuccess = (data) => {
//   return { type: LOGIN_SUCCESS, payload: data };
// };

// export const loginUserFailed = (error) => {
//   return { type: LOGIN_ERROR, payload: error };
// };

// export const login = (email, password) => {
//   return { type: POST_LOGIN, email, password };
// };

export const getMasterRole = () => {
  return (dispatch) => {
    dispatch({
      type: MASTER__CHECK__START,
    });

    api
      .get('/user/settings/role-master/check ', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: MASTER__CHECK__SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addMasterRole = () => {
  return (dispatch) => {
    dispatch({
      type: MASTER__ADD__START,
    });

    api
      .get('/user/settings/role-master/add', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: MASTER__ADD__SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const deleteMasterRole = () => {
  return (dispatch) => {
    dispatch({
      type: MASTER__REMOVE__START,
    });

    api
      .get('/user/settings/role-master/remove', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: MASTER__REMOVE__SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
