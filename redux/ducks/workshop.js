import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MATERIALS_LOAD_START = 'master/materials/load/start';
const MATERIALS_LOAD_SUCCESS = 'master/materials/load/success';

const PROCESSED_LOAD_START = 'processed/load/start';
const PROCESSED_LOAD_SUCCESS = 'processed/load/success';

const PROCESSING_LOAD_START = 'processing/load/start';
const PROCESSING_LOAD_SUCCESS = 'processing/load/success';

const PROCESSING_FILE_LOAD_START = 'show/processing/load/start';
const PROCESSING_FILE_LOAD_SUCCESS = 'show/processing/load/success';

const PROCESSED_FILE_LOAD_START = 'show/processed/load/start';
const PROCESSED_FILE_LOAD_SUCCESS = 'show/processed/load/success';

const PROCESSING_ADD_START = 'processing/add/start';
const PROCESSING_ADD_SUCCESS = 'processing/add/success';

const PROCESSING_DELETE_START = 'processing/delete/start';
const PROCESSING_DELETE_SUCCESS = 'processing/delete/success';

const PROCESSED_DELETE_START = 'processed/delete/start';
const PROCESSED_DELETE_SUCCESS = 'processed/delete/success';

const TEXT_LOAD_START = 'master/text/load/start';
const TEXT_LOAD_SUCCESS = 'master/text/load/success';

const AUDIOS_LOAD_START = 'master/audios/load/start';
const AUDIOS_LOAD_SUCCESS = 'master/audios/load/success';

const APPLICATIONS_LOAD_START = 'master/applications/load/start';
const APPLICATIONS_LOAD_SUCCESS = 'master/applications/load/success';

const PHOTOS_LOAD_START = 'master/photos/load/start';
const PHOTOS_LOAD_SUCCESS = 'master/photos/load/success';

const VIDEOS_LOAD_START = 'master/videos/load/start';
const VIDEOS_LOAD_SUCCESS = 'master/videos/load/success';

const SHOW_LOAD_START = 'master/show/load/start';
const SHOW_LOAD_SUCCESS = 'master/show/load/success';

const PROCESSED_SEND_START = 'master/processed/send/start';
const PROCESSED_SEND_SUCCESS = 'master/processed/send/success';

const PROCESSED_SEND_TEXT_START = 'master/processed/send/start';
const PROCESSED_SEND_TEXT_SUCCESS = 'master/processed/send/success';

const ADDED_FILE_START = 'master/file/add/start';
const ADDED_FILE_SUCCESS = 'master/file/add/success';

const PROCESSING_SAVE_START = 'master/file/save/start';
const PROCESSING_SAVE_SUCCESS = 'master/file/save/success';

const UPLOAD_PROGRESS = 'change/workshop/progress';

const SEND_SUCCESSFUL = 'master/send/successful';

const initialState = {
  materials: [],
  photos: [],
  videos: [],
  applications: [],
  audios: [],
  text: [],
  processed: [],
  processing: [],
  show: {},
  file: null,
  save: null,
  loading: false,
  progress: 0,
  loadProgress: false,
  error: '',
  messageSend: null,
  loadSend: false,
};

export default function workshop(state = initialState, action) {
  switch (action.type) {
    case PROCESSING_SAVE_START:
      return {
        ...state,
        loading: false,
      };

    case PROCESSING_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        save: action.payload.message,
      };

    case ADDED_FILE_START:
      return {
        ...state,
        loadProgress: true,
      };

    case ADDED_FILE_SUCCESS:
      return {
        ...state,
        file: action.payload.message,
        loadProgress: false,
        progress: 0,
      };

    case MATERIALS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case MATERIALS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: action.payload.message,
      };

    case PHOTOS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PHOTOS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.payload.message,
      };

    case VIDEOS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case VIDEOS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload.message,
      };

    case APPLICATIONS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case APPLICATIONS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        applications: action.payload.message,
      };

    case AUDIOS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case AUDIOS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        audios: action.payload.message,
      };

    case TEXT_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case TEXT_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        text: action.payload.message,
      };

    case SHOW_LOAD_START:
      return {
        ...state,
        loading: true,
        file: null,
      };

    case SHOW_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        show: action.payload.message,
      };

    case PROCESSING_FILE_LOAD_START:
      return {
        ...state,
        loading: true,
        file: null,
      };

    case PROCESSING_FILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        show: action.payload.message,
      };

    case PROCESSED_FILE_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESSED_FILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        show: action.payload.message,
      };

    case PROCESSED_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESSED_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        processed: action.payload.message,
      };

    case PROCESSING_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESSING_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        processing: action.payload.message,
      };

    case PROCESSING_ADD_SUCCESS:
      return {
        ...state,
        show: {
          ...state.show,
          file: {
            ...state.show.file,
            process_status: 'processing',
          },
        },
      };

    case PROCESSING_DELETE_SUCCESS:
      return {
        ...state,
        show: {
          ...state.show,
          file: {
            ...state.show.file,
            process_status: 'wait',
          },
        },
      };

    case PROCESSED_DELETE_SUCCESS:
      return {
        ...state,
        file: null,
      };

    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };

    case PROCESSED_SEND_START:
      return {
        ...state,
        loadSend: true,
      };

    case PROCESSED_SEND_SUCCESS:
      return {
        ...state,
        messageSend: action.payload,
      };

    case SEND_SUCCESSFUL:
      return {
        ...state,
        messageSend: null,
        loadSend: false,
      };

    default:
      return state;
  }
}

export const getMaterials = () => {
  return (dispatch) => {
    dispatch({
      type: MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: MATERIALS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getMasterPhotos = () => {
  return (dispatch) => {
    dispatch({
      type: PHOTOS_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new?filter=photo', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PHOTOS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getMasterVideos = () => {
  return (dispatch) => {
    dispatch({
      type: VIDEOS_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new?filter=video', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: VIDEOS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getMasterText = () => {
  return (dispatch) => {
    dispatch({
      type: TEXT_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new?filter=text', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: TEXT_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getMasterAudio = () => {
  return (dispatch) => {
    dispatch({
      type: AUDIOS_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new?filter=audio', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: AUDIOS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getMasterApplications = () => {
  return (dispatch) => {
    dispatch({
      type: APPLICATIONS_LOAD_START,
    });

    api
      .get('/cabinet/files/list/new?filter=document', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: APPLICATIONS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const showNewFile = (id) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_LOAD_START,
    });

    api
      .get(`/cabinet/files/new/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: SHOW_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const showProcessingFile = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSING_FILE_LOAD_START,
    });

    api
      .get(`/cabinet/files/process/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSING_FILE_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const showProcessedFile = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_FILE_LOAD_START,
    });

    api
      .get(`/cabinet/files/processed/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_FILE_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getProcessedFiles = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_LOAD_START,
    });

    api
      .get('/cabinet/files/list/processed', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getProcessingFiles = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESSING_LOAD_START,
    });

    api
      .get('/cabinet/files/list/processing', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSING_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addedFileInProcessing = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSING_ADD_START,
      action: id,
    });

    api
      .post(
        '/cabinet/files/process/add',
        { process_id: id },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSING_ADD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const deleteFileInProcessing = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSING_DELETE_START,
      action: id,
    });

    api
      .delete(`/cabinet/files/process/reject/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSING_DELETE_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const sendFileInProcessed = (process_id, file_id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_SEND_START,
      action: process_id,
      file_id,
    });

    api
      .post(
        '/cabinet/files/process/send',
        { process_id, file_id },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_SEND_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const sendTextInProcessed = (process_id, text) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_SEND_TEXT_START,
      action: process_id,
      text,
    });

    api
      .post(
        '/cabinet/files/process/send',
        { process_id, text },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_SEND_TEXT_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addFileInProcessed = (file, format) => {
  const form = new FormData();
  form.append('file', file);
  form.append('type', format);

  return (dispatch) => {
    dispatch({ type: ADDED_FILE_START, file, format });

    api
      .post('/cabinet/files/process/upload', form, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length',
              );
          if (totalLength) {
            let progress = Math.round(
              (progressEvent.loaded * 100) / totalLength,
            );
            dispatch({
              type: UPLOAD_PROGRESS,
              payload: progress,
            });
          }
        },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: ADDED_FILE_SUCCESS,
          payload: data,
          format,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// fileUploadDelete

export const deleteFileInProcessed = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_DELETE_START,
      action: id,
    });

    api
      .get(`/cabinet/files/process/uploaded/delete/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_DELETE_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const addSuccessfulSend = () => {
  return {
    type: SEND_SUCCESSFUL,
  };
};
