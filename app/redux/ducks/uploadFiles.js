import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FILES_UPLOAD_START = 'files/post/start';
const FILES_UPLOAD_SUCCESS = 'files/post/success';
const FILES_UPLOAD_ERROR = 'files/post/error';
const CHANGE_PROGRESS = 'change/upload/progress';
const PROGRESS_ERROR_CHANGE = 'progress/error/change';

const CLEAN_UPLOADFILES = 'clean/uploadFiles';

const initialState = {
  loading: false,
  progress: 0,
  error: false,
  files: {},
};

export default function uploadFiles(state = initialState, action) {
  switch (action.type) {
    case FILES_UPLOAD_START:
      return {
        ...state,
        loading: true,
      };

    case FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        files: action.payload.message,
        progress: 0,
      };

    case CHANGE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };

    case CLEAN_UPLOADFILES:
      return {
        ...state,
        loading: false,
        progress: 0,
        files: {},
      };

    case FILES_UPLOAD_ERROR:
      return {
        ...state,
        error: true,
        progress: 0,
      };

    case PROGRESS_ERROR_CHANGE:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}

export const postFail = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file[0].uri,
    name: file[0].filename,
    type: 'image/jpeg',
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: FILES_UPLOAD_START });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
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
                type: CHANGE_PROGRESS,
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: FILES_UPLOAD_SUCCESS,
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFailDocument = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: FILES_UPLOAD_START });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
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
                type: CHANGE_PROGRESS,
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: FILES_UPLOAD_SUCCESS,
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFileHistorian = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: FILES_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          '/cabinet/material/send/draft/file',
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${value}`,
            },
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
                  type: CHANGE_PROGRESS,
                  payload: progress,
                });
              }
            },
          },
        );
        dispatch({
          type: FILES_UPLOAD_SUCCESS,
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
      dispatch({
        type: FILES_UPLOAD_ERROR,
      });
    }
  };
};

export const postFilesGroup = (files, format, causes) => {
  const form = new FormData();
  form.append('type', format);
  for (let i = 0; i < files.length; i++) {
    form.append(`files[${i}]`, {
      uri: files[i].uri,
      name: files[i].filename,
      type: 'image/jpeg',
    });
  }

  for (let i = 0; i < causes.length; i++) {
    form.append(`causes[${i}]`, causes[i]);
  }

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: FILES_UPLOAD_START });

      if (value !== null) {
        const response = await api.post('/user/draft/group', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
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
                type: CHANGE_PROGRESS,
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: FILES_UPLOAD_SUCCESS,
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const cleanUploadFiles = () => {
  return {
    type: CLEAN_UPLOADFILES,
  };
};

export const changeProgressError = () => {
  return {
    type: PROGRESS_ERROR_CHANGE,
  };
};
