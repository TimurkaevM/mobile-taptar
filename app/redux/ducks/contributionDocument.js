import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DOCUMENT_START = 'document/load/start';
export const DOCUMENT_SUCCESS = 'document/load/success';

const initialState = {
  document: [],
  loading: false,
  error: null,
};

export default function contributionDocument(state = initialState, action) {
  switch (action.type) {
    case DOCUMENT_START:
      return {
        ...state,
        loading: true,
      };

    case DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        document: action.payload.message,
      };

    default:
      return state;
  }
}

export const getDocument = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: DOCUMENT_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/document', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: DOCUMENT_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const getDocumentHistorian = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: DOCUMENT_START });

      if (value !== null) {
        const response = await api.get('/cabinet/bookmark/document', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: DOCUMENT_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};
