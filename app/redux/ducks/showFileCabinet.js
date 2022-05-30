import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FILE_START = 'bookmark/file/load/start';
export const FILE_SUCCESS = 'bookmark/file/load/success';
export const FILE_ERROR = 'bookmark/file/load/error';

export const FILE_DELETE_START = 'bookmark/file/delete/start';
export const FILE_DELETE_SUCCESS = 'bookmark/file/delete/success';

export const CLOSE_BOOKMARK_DIALOG = 'bookmark/dialog/close';

const initialState = {
  open: false,
  file: {},
  loading: false,
  error: '',
};

export default function showFileCabinet(state = initialState, action) {
  switch (action.type) {
    case FILE_START:
      return {
        ...state,
        open: true,
        loading: true,
      };

    case FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        file: action.payload.message,
      };

    case CLOSE_BOOKMARK_DIALOG:
      return {
        ...state,
        open: false,
        file: {},
        loading: false,
        error: '',
      };

    default:
      return state;
  }
}

export const getCabinetFile = (id) => {
  return (dispatch) => {
    dispatch({
      type: FILE_START,
    });

    api
      .get(`cabinet/bookmark/file/${id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: FILE_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getContributionFile = (id) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: FILE_START,
      });

      if (value !== null) {
        const response = await api.get(`/user/contribution/file/${id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: FILE_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: FILE_ERROR,
      });
    }
  };
};

export const closeBookmarkDialog = () => {
  return {
    type: CLOSE_BOOKMARK_DIALOG,
  };
};
