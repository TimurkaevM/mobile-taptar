import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MATERIAL_START = 'material/load/start';
export const MATERIAL_SUCCESS = 'material/load/success';
export const READY_START = 'material/ready/load/start';
export const READY_SUCCESS = 'material/ready/load/success';
export const READY_ERROR = 'material/ready/load/error';

const initialState = {
  material: [],
  readyMaterial: [],
  loading: false,
  error: null,
};

export default function contributionMaterial(state = initialState, action) {
  switch (action.type) {
    case READY_START:
      return {
        ...state,
        loading: true,
      };

    case READY_SUCCESS:
      return {
        ...state,
        loading: false,
        readyMaterial: action.payload.message,
      };

    case READY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MATERIAL_START:
      return {
        ...state,
        loading: true,
      };

    case MATERIAL_SUCCESS:
      const materials = action.payload.message;
      const arrWait = materials.filter((item) => item.status === 'wait');
      const processingArr = materials.filter(
        (item) => item.status === 'processing',
      );
      const processedArr = materials.filter(
        (item) => item.status === 'processed',
      );

      return {
        ...state,
        loading: false,
        material: Array.isArray(materials)
          ? [...arrWait, ...processingArr, ...processedArr]
          : materials,
      };

    default:
      return state;
  }
}

export const getMaterial = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: MATERIAL_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/all', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: MATERIAL_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const getReadyMaterial = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: READY_START });

      if (value !== null) {
        const response = await api.get('/user/contribution/material', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: READY_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: READY_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};
