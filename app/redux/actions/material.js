import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DRAFT_CHANGE_ERROR,
  DRAFT_GET_ERROR,
  DRAFT_GET_START,
  DRAFT_GET_SUCCESS,
  GROUP_CHANGE_SUCCESS,
  GROUP_UPLOAD_SUCCESS,
  MATERIA_POST_ERROR,
  MATERIA_POST_START,
  MATERIA_POST_SUCCESS,
  ONE_CHANGE_SUCCESS,
  ONE_UPLOAD_SUCCESS,
  REMOVE_FILES_START,
  REMOVE_FILES_SUCCESS,
  REMOVE_FILE_START,
  REMOVE_FILE_SUCCESS,
  SEND_ERROR_CHANGE,
  TEXT_CHANGE_SUCCESS,
  TEXT_UPLOAD_SUCCESS,
} from '../ducks/files';

// export const REMOVE_FILE_START = 'file/remove/start';
// export const REMOVE_FILE_SUCCESS = 'file/remove/success';
// export const REMOVE_FILES_START = 'files/remove/start';
// export const REMOVE_FILES_SUCCESS = 'files/remove/success';
// export const ONE_UPLOAD_START = 'one/upload/start';
// export const ONE_UPLOAD_SUCCESS = 'one/upload/success';
// export const GROUP_UPLOAD_START = 'group/upload/start';
// export const GROUP_UPLOAD_SUCCESS = 'group/upload/success';
// export const TEXT_UPLOAD_START = 'text/upload/start';
// export const TEXT_UPLOAD_SUCCESS = 'text/upload/success';
// export const ONE_CHANGE_START = 'one/change/start';
// export const ONE_CHANGE_SUCCESS = 'one/change/success';
// export const GROUP_CHANGE_START = 'group/change/start';
// export const GROUP_CHANGE_SUCCESS = 'group/change/success';
// export const TEXT_CHANGE_START = 'text/change/start';
// export const TEXT_CHANGE_SUCCESS = 'text/change/success';
// export const DRAFT_GET_START = 'draft/load/start';
// export const DRAFT_GET_SUCCESS = 'draft/load/success';
// export const DRAFT_GET_ERROR = 'draft/load/error';
// export const DRAFT_CHANGE_ERROR = 'draft/change/error';
// export const MATERIA_POST_START = 'material/post/start';
// export const MATERIA_POST_SUCCESS = 'material/post/success';
// export const MATERIA_POST_ERROR = 'material/post/error';
// export const SEND_ERROR_CHANGE = 'send/error/change';

// Файлы
export const UploadTextFail = (
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
  file,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: TEXT_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          'user/draft/text',
          {
            text: file,
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: TEXT_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e.response.data);
    }
  };
};

export const UploadOneFail = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: ONE_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          `user/draft/edit/file/${file.id}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: ONE_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          format,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const UploadGroupFails = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: GROUP_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          `user/draft/edit/group/${file.group}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: GROUP_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          format,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeFiles = (files) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: REMOVE_FILES_START,
      });

      if (value !== null) {
        const response = await api.delete(
          `/user/draft/group/${files.group_uid}`,
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: REMOVE_FILES_SUCCESS,
          payload: files,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeFile = (file) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: REMOVE_FILE_START,
      });

      if (value !== null) {
        const response = await api.delete(`/user/draft/file/${file.id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: REMOVE_FILE_SUCCESS,
          payload: file,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const getDraftFiles = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: DRAFT_GET_START,
      });

      if (value !== null) {
        const response = await api.get('user/drafts', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: DRAFT_GET_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: DRAFT_GET_ERROR,
      });
    }
  };
};

export const setDraftError = () => {
  return {
    type: DRAFT_CHANGE_ERROR,
  };
};

//Изменение принадлежностей файлов

export const changeTextFile = (
  file,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: TEXT_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/text/${file.id}`,
          {
            text: file.text,
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: TEXT_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeOneFile = (
  id,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: ONE_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/file/${id}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: ONE_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
          format,
          id,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeGroupFiles = (
  format,
  group,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: GROUP_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/group/${group}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: GROUP_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
          group,
          format,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

// api/user/add/material/send

export const postMaterial = (title, text, photo, document, video, audio) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: MATERIA_POST_START });

      if (value !== null) {
        const response = await api.post(
          '/user/contribution/material/send',
          {
            title,
            text,
            photo,
            document,
            audio,
            video,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: MATERIA_POST_SUCCESS,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: MATERIA_POST_ERROR,
      });
    }
  };
};

export const setSendError = () => {
  return {
    type: SEND_ERROR_CHANGE,
  };
};
