import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  info: '',
  room: {},
  companions: [],
  materials: [],
  messages: [],
  loading: false,
  LoadingMessage: false,
  filter: '',
};

const MESSAGES_LOAD_START = 'messages/load/start';
const MESSAGES_LOAD_SUCCESS = 'messages/load/success';
const MESSAGES_LOAD_ERROR = 'messages/load/error';
const DELETE_MESSAGE_START = 'messages/delete/start';
const DELETE_MESSAGE_SUCCESS = 'messages/delete/success';
const MESSAGES_ADDING_START = 'messages/adding/start';
const MESSAGES_ADDING_SUCCESS = 'messages/adding/success';
const MESSAGES_ADDING_ERROR = 'messages/adding/error';
const INCOMING_SAVED_START = 'incomingMessages/saved/start';
const INCOMING_SAVED_SUCCESS = 'incomingMessages/saved/success';
const INCOMING_SAVED_ERROR = 'incomingMessages/saved/error';
const OUTGOING_SAVED_SUCCESS = 'messages/saved/success';
const FILE_POST_START = 'chat/files/post/start';
const FILE_POST_SUCCESS = 'chat/files/post/success';
const FILE_POST_ERROR = 'chat/files/post/error';

export default function messages(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOAD_START:
      return {
        ...state,
        loading: true,
        messages: [],
      };
    case MESSAGES_LOAD_SUCCESS:
      return {
        ...state,
        messages: action.payload.message.messages.reverse(),
        room: action.payload.message.room,
        companions: action.payload.message.companions,
        materials: action.payload.message.material,
        loading: false,
      };
    case MESSAGES_ADDING_START:
      return {
        ...state,
        loadingMessage: true,
      };
    case MESSAGES_ADDING_SUCCESS:
      return {
        ...state,
        info: action.payload.message,
        loadingMessage: false,
      };
    case MESSAGES_ADDING_ERROR:
      return {
        ...state,
        loadingMessage: false,
      };

    case OUTGOING_SAVED_SUCCESS:
      return {
        ...state,
        messages:
          action.payload.room_id === state.room.id
            ? [action.payload.data, ...state.messages]
            : state.messages,
        loadingMessage: false,
      };

    case INCOMING_SAVED_SUCCESS:
      return {
        ...state,
        messages:
          action.payload.room_id === state.room.id
            ? [action.payload.data, ...state.messages]
            : state.messages,
        loadingMessage: false,
      };

    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload,
        ),
      };
    // case 'messages/search/filtered':
    //   return {
    //     ...state,
    //     filter: action.payload,
    //   };
    // case 'messages/search/reset':
    //   return {
    //     ...state,
    //     filter: '',
    //   };

    default:
      return state;
  }
}

// тут экшн креэйторы

export const setFilterMessage = (value) => {
  return {
    type: 'messages/search/filtered',
    payload: value,
  };
};

export const resetFilterMessage = () => {
  return {
    type: 'messages/search/reset',
  };
};

// тут санки

// Санк для подгрузки сообщений
export const loadMessages = (id) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: MESSAGES_LOAD_START,
      });

      if (value !== null) {
        const response = await api.get(`chat/${id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: MESSAGES_LOAD_SUCCESS,
          payload: response.data,
          id: id,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: MESSAGES_LOAD_ERROR,
      });
    }
  };
};

export const addingMassage = (myId, contactId, type, content) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: MESSAGES_ADDING_START });

      if (value !== null) {
        const response = await api.post(
          `chat/${contactId}`,
          {
            myId: myId,
            contactId: contactId,
            type,
            text: content,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: MESSAGES_ADDING_SUCCESS,
          payload: { ...response.data },
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: MESSAGES_ADDING_ERROR,
      });
    }
  };
};

export const addingMaterialFile = (roomId, fileId) => {
  return (dispatch) => {
    dispatch({
      type: 'material/adding/start',
      payload: { roomId, fileId },
    });
    api
      .post(`/chat/${roomId}/material/${fileId}`, {})
      .then((response) => response.data)
      .then((data) => {
        // scrollMessages();
        dispatch({
          type: 'material/adding/success',
          payload: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const savedMassage = (data) => {
  // scrollMessages();
  return {
    type: OUTGOING_SAVED_SUCCESS,
    payload: data,
  };
};

export const savedIncomingMassage = (message) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: INCOMING_SAVED_START,
      });

      if (value !== null) {
        const response = await api.get(
          `/chat/${message.room_id}/message/${message.data.id}/read`,
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: INCOMING_SAVED_SUCCESS,
          payload: message,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: INCOMING_SAVED_ERROR,
      });
    }
  };
};

// Санк для удаления сообщения
export const removingMessage = (roomId, messageId) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: DELETE_MESSAGE_START,
      });

      if (value !== null) {
        const response = await api.delete(
          `/chat/${roomId}/message/${messageId}`,
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: DELETE_MESSAGE_SUCCESS,
          payload: messageId,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

//Отправка файла
export const addFile = (file, format, id) => {
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

      dispatch({ type: FILE_POST_START });

      if (value !== null) {
        const response = await api.post(`/chat/${id}/upload`, form, {
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
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: FILE_POST_SUCCESS,
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
      dispatch({
        type: FILE_POST_ERROR,
      });
    }
  };
};
