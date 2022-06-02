import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUDIO_START = 'audio/load/start';
export const AUDIO_SUCCESS = 'audio/load/success';

const initialState = {
  audio: [],
  loading: false,
  error: null,
};

export default function contribution(state = initialState, action) {
  switch (action.type) {
    case AUDIO_START:
      return {
        ...state,
        loading: true,
      };

    case AUDIO_SUCCESS:
      return {
        ...state,
        loading: false,
        audio: action.payload.message,
      };

    default:
      return state;
  }
}

export const getAudio = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: AUDIO_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/audio', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: AUDIO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};