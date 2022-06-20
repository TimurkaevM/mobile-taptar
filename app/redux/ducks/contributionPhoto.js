import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PHOTO_START = 'photo/load/start';
export const PHOTO_SUCCESS = 'photo/load/success';

const initialState = {
  photo: [],
  loading: false,
  error: null,
};

export default function contributionPhoto(state = initialState, action) {
  switch (action.type) {
    case PHOTO_START:
      return {
        ...state,
        loading: true,
      };

    case PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        photo: action.payload.message,
      };

    default:
      return state;
  }
}

export const getPhoto = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: PHOTO_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/photo', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: PHOTO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const getPhotoHistorian = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: PHOTO_START });

      if (value !== null) {
        const response = await api.get('/cabinet/bookmark/photo', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: PHOTO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};
