import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CENTURIES_START = 'centuries/load/start';
export const CENTURIES_SUCCESS = 'centuries/load/success';
export const EFFECTS_START = 'effects/load/start';
export const EFFECTS_SUCCESS = 'effects/load/success';
export const CREDIBILITY_START = 'credibility/load/start';
export const CREDIBILITY_SUCCESS = 'credibility/load/success';
export const DELETE_START = 'delete/load/start';
export const DELETE_SUCCESS = 'delete/load/success';
export const TYPES_START = 'types/load/start';
export const TYPES_SUCCESS = 'types/load/success';
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
    case CENTURIES_START:
      return {
        ...state,
        loading: true,
      };

    case CENTURIES_SUCCESS:
      return {
        ...state,
        loading: false,
        centuries: action.payload.message,
      };

    case DELETE_START:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteTag: action.payload.message,
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

    case CREDIBILITY_START:
      return {
        ...state,
        loading: true,
      };

    case CREDIBILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        credibility: action.payload.message,
      };

    case TYPES_START:
      return {
        ...state,
        loading: true,
      };

    case TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        types: action.payload.message,
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

export const getCenturies = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: CENTURIES_START,
      });

      if (value !== null) {
        const response = await api.get('/tags/century', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: CENTURIES_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDelete = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_START,
    });

    api
      .get('/tags/delete', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: DELETE_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getCredibility = () => {
  return (dispatch) => {
    dispatch({
      type: CREDIBILITY_START,
    });

    api
      .get('/tags/credibility', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CREDIBILITY_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
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

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: TYPES_START,
      });

      if (value !== null) {
        const response = await api.get('/tags/information', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: TYPES_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCauses = () => {
  return (dispatch) => {
    dispatch({
      type: CAUSES_START,
    });

    api
      .get('/tags/group', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CAUSES_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
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
