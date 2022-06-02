import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VIDEO_START = 'video/load/start';
export const VIDEO_SUCCESS = 'video/load/success';

const initialState = {
  video: [],
  loading: false,
  error: null,
};

export default function contributionVideo(state = initialState, action) {
  switch (action.type) {
    case VIDEO_START:
      return {
        ...state,
        loading: true,
      };

    case VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.payload.message,
      };

    default:
      return state;
  }
}

export const getVideo = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: VIDEO_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/video', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: VIDEO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};