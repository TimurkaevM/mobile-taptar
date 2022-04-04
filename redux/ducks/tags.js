import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ALL_TAGS_START = 'tags/load/start';
export const ALL_TAGS_SUCCESS = 'tags/load/success';

export const EFFECTS_START = 'effects/load/start';
export const EFFECTS_SUCCESS = 'effects/load/success';
export const CAUSES_START = 'causes/load/start';
export const CAUSES_SUCCESS = 'causes/load/success';
export const CHECK_START = 'check/load/start';
export const CHECK_SUCCESS = 'check/load/success';
export const CAUSES_SELECTED = 'causes/load/selected';
export const CAUSES_DELETE = 'causes/load/delete';
export const CAUSES_CLEAR = 'causes/load/clear';

const initialState = {
  deleteTag: [],
  effects: [],
  centuries: [],
  types: [],
  causes: [],
  credibility: [],
  check: [],
  causesSelected: [],
  causesID: [],
  loading: false,
  error: '',
};

export default function contribution(state = initialState, action) {
  switch (action.type) {
    case ALL_TAGS_START:
      return {
        ...state,
        loading: true,
      };

    case ALL_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        centuries: action.payload.message.tags_century,
        deleteTag: action.payload.message.tags_delete,
        types: action.payload.message.tags_information,
        albums: action.payload.message.albums,
        credibility: action.payload.message.tags_credibility,
      };

    case EFFECTS_START:
      return {
        ...state,
        loading: true,
      };

    case EFFECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        effects: action.payload.message,
      };

    case CAUSES_START:
      return {
        ...state,
        loading: true,
      };

    case CAUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        causes: action.payload.message,
      };

    case CHECK_START:
      return {
        ...state,
        loading: true,
      };

    case CHECK_SUCCESS:
      return {
        ...state,
        loading: false,
        check: action.payload.message,
      };

    case CAUSES_SELECTED:
      return {
        ...state,
        causesID: [...state.causesID, action.payload.id],
        causesSelected: [...state.causesSelected, action.payload],
      };

    case CAUSES_DELETE:
      return {
        ...state,
        causesID: state.causesID.filter((item) => item !== action.payload),
        causesSelected: state.causesSelected.filter(
          (item) => item !== action.payload,
        ),
      };

    case CAUSES_CLEAR:
      return {
        ...state,
        causesID: [],
        causesSelected: [],
      };

    default:
      return state;
  }
}

export const getAllTags = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: ALL_TAGS_START,
      });

      if (value !== null) {
        const response = await api.get('/tags/all', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: ALL_TAGS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getEffects = () => {
  return (dispatch) => {
    dispatch({
      type: EFFECTS_START,
    });

    api
      .get('/tags/effects', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: EFFECTS_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getCauses = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: CAUSES_START,
      });

      if (value !== null) {
        const response = await api.get('/tags/group', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: CAUSES_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCheckCauses = (group) => {
  return (dispatch) => {
    dispatch({
      type: CHECK_START,
    });

    api
      .get(`/user/draft/group/tags${group}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CHECK_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const checkCauses = (caus) => {
  return {
    type: CAUSES_SELECTED,
    payload: caus,
  };
};

export const clearCauses = () => {
  return {
    type: CAUSES_CLEAR,
  };
};

export const deleteCauses = (caus) => {
  return {
    type: CAUSES_DELETE,
    payload: caus,
  };
};
