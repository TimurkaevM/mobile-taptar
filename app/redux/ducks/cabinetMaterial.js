import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_MATERIAL_LOAD_START = 'bookmark/material/load/start ';
const BOOKMARK_MATERIAL_LOAD_SUCCESS = 'bookmark/material/load/success';

const CONTRIBUTION_MATERIAL_LOAD_START = 'contribution/material/load/start ';
const CONTRIBUTION_MATERIAL_LOAD_SUCCESS = 'contribution/material/load/success';
const CONTRIBUTION_MATERIAL_LOAD_ERROR = 'contribution/material/load/error';

const DELETE_PROCESS_LOAD_START = 'bookmark/material/delete/load/start';
const DELETE_PROCESS_LOAD_SUCCESS = 'bookmark/material/delete/load/success';

const initialState = {
  message: '',
  loading: false,
  material: {
    id: '',
    process_id: null,
    process_status: null,
    title: '',
    user_id: null,
    processed: null,
    files: {
      text: {},

      photo: [],

      audio: [],

      document: [],

      video: [],
    },
  },
};

export default function cabinetMaterial(state = initialState, action) {
  switch (action.type) {
    //Получение обрабатываемого материала
    case BOOKMARK_MATERIAL_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case BOOKMARK_MATERIAL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        material: {
          id: action.payload.message.material.id,
          process_id: action.payload.message.process_id,
          process_status: action.payload.message.process_status,
          title: action.payload.message.material.title,
          user_id: action.payload.message.material.user_id,
          files: {
            text: action.payload.message.material.files.text,

            photo: action.payload.message.material.files.photo,

            audio: action.payload.message.material.files.audio,

            document: action.payload.message.material.files.document,

            video: action.payload.message.material.files.video,
          },
        },
      };

    case CONTRIBUTION_MATERIAL_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case CONTRIBUTION_MATERIAL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        material: {
          id: action.payload.message.id,
          process_id: action.payload.message.process_id,
          process_status: action.payload.message.process_status,
          title: action.payload.message.title,
          user_id: action.payload.message.id,
          files: {
            text: action.payload.message.files.text || {},

            photo: action.payload.message.files.photo || [],

            audio: action.payload.message.files.audio || [],

            document: action.payload.message.files.document || [],

            video: action.payload.message.files.video || [],
          },
        },
      };

    default:
      return state;
  }
}

export const getShowMaterial = (id) => {
  return (dispatch) => {
    dispatch({
      type: BOOKMARK_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/material/processed/${id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: BOOKMARK_MATERIAL_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getContributionMaterial = (id) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: CONTRIBUTION_MATERIAL_LOAD_START,
      });

      if (value !== null) {
        const response = await api.get(`/user/contribution/material/${id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: CONTRIBUTION_MATERIAL_LOAD_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: CONTRIBUTION_MATERIAL_LOAD_ERROR,
      });
    }
  };
};

export const deleteCabinetMaterial = (bookmark_id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PROCESS_LOAD_START,
    });

    api
      .delete(`cabinet/bookmark/${bookmark_id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: DELETE_PROCESS_LOAD_SUCCESS,
          payload: bookmark_id,
          data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
