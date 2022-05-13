import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MATERIAL_START = 'material/load/start';
export const MATERIAL_SUCCESS = 'material/load/success';
export const PHOTO_START = 'photo/load/start';
export const PHOTO_SUCCESS = 'photo/load/success';
export const VIDEO_START = 'video/load/start';
export const VIDEO_SUCCESS = 'video/load/success';
export const AUDIO_START = 'audio/load/start';
export const AUDIO_SUCCESS = 'audio/load/success';
export const DOCUMENT_START = 'document/load/start';
export const DOCUMENT_SUCCESS = 'document/load/success';
export const SHOW_START = 'material/show/load/start';
export const SHOW_SUCCESS = 'material/show/load/success';
export const READY_START = 'material/ready/load/start';
export const READY_SUCCESS = 'material/ready/load/success';

const initialState = {
  material: [],
  readyMaterial: [],
  photo: [],
  video: [],
  audio: [],
  document: [],
  showMaterial: {},
  loading: false,
  showLoading: false,
  error: '',
};

export default function contribution(state = initialState, action) {
  switch (action.type) {
    case SHOW_START:
      return {
        ...state,
        showLoading: true,
      };

    case SHOW_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          showLoading: false,
          showMaterial: action.payload.message,
        };
      }

      return {
        ...state,
        showLoading: false,
        showMaterial: action.payload.message,
      };

    case READY_START:
      return {
        ...state,
        loading: true,
      };

    case READY_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          readyMaterial: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        readyMaterial: action.payload.message.message,
      };

    case MATERIAL_START:
      return {
        ...state,
        loading: true,
      };

    case MATERIAL_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          material: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        material: action.payload.message['0'],
      };

    case PHOTO_START:
      return {
        ...state,
        loading: true,
      };

    case PHOTO_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          photo: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        photo: action.payload.message.message,
      };

    case VIDEO_START:
      return {
        ...state,
        loading: true,
      };

    case VIDEO_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          video: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        video: action.payload.message.message,
      };

    case AUDIO_START:
      return {
        ...state,
        loading: true,
      };

    case AUDIO_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          audio: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        audio: action.payload.message.message,
      };

    case DOCUMENT_START:
      return {
        ...state,
        loading: true,
      };

    case DOCUMENT_SUCCESS:
      if (action.payload.code === 404) {
        return {
          ...state,
          loading: false,
          document: action.payload.message,
        };
      }

      return {
        ...state,
        loading: false,
        document: action.payload.message.message,
      };

    default:
      return state;
  }
}

export const getMaterial = () => {
  return (dispatch) => {
    dispatch({
      type: MATERIAL_START,
    });

    api
      .get('/user/contribution/all', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: MATERIAL_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getReadyMaterial = () => {
  return (dispatch) => {
    dispatch({
      type: READY_START,
    });

    api
      .get('/user/contribution/material', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: READY_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getPhoto = () => {
  return (dispatch) => {
    dispatch({
      type: PHOTO_START,
    });

    api
      .get('/user/contribution/photo', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PHOTO_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getVideo = () => {
  return (dispatch) => {
    dispatch({
      type: VIDEO_START,
    });

    api
      .get('/user/contribution/video', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: VIDEO_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getAudio = () => {
  return (dispatch) => {
    dispatch({
      type: AUDIO_START,
    });

    api
      .get('/user/contribution/audio', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: AUDIO_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getDocument = () => {
  return (dispatch) => {
    dispatch({
      type: DOCUMENT_START,
    });

    api
      .get('/user/contribution/document', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: DOCUMENT_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getShowMaterial = (id) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_START,
    });

    api
      .get(`/user/contribution/material/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: SHOW_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
