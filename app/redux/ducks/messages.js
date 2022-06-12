// import { scrollMessages } from '../../components/History/Content/Messenger/addition';
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

export default function messages(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOAD_START:
      return {
        ...state,
        loading: true,
        messages: [],
      };
    case MESSAGES_LOAD_SUCCESS:
      // scrollMessages();
      return {
        ...state,
        messages: action.payload.message.messages,
        room: action.payload.message.room,
        companions: action.payload.message.companions,
        materials: action.payload.message.material,
        loading: false,
      };
    case 'messages/adding/start':
      return {
        ...state,
        loadingMessage: true,
      };
    case 'messages/adding/success':
      return {
        ...state,
        info: action.payload.message,
        loadingMessage: false,
      };

    case 'messages/saved/start':
      return {
        ...state,
        loadingMessage: true,
      };

    case 'messages/saved/success':
      return {
        ...state,
        messages:
          action.payload.room_id === state.room.id
            ? [...state.messages, action.payload.data]
            : state.messages,
        loadingMessage: false,
      };

    case 'incomingMessages/saved/success':
      return {
        ...state,
        messages:
          action.payload.room_id === state.room.id
            ? [...state.messages, action.payload.data]
            : state.messages,
        loadingMessage: false,
      };

    case 'messages/delete/success':
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload,
        ),
      };
    case 'messages/search/filtered':
      return {
        ...state,
        filter: action.payload,
      };
    case 'messages/search/reset':
      return {
        ...state,
        filter: '',
      };

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
        type: MESSAGES_LOAD_SUCCESS,
      });
    }
  };
};

export const addingMassage = (myId, contactId, type, content) => {
  const tempId = Math.random();
  return (dispatch) => {
    dispatch({
      type: 'messages/adding/start',
      payload: { myId, contactId, type, content, tempId: tempId },
    });
    api
      .post(`chat/${contactId}`, {
        myId: myId,
        contactId: contactId,
        type: 'text',
        text: content,
      })
      .then((response) => response.data)
      .then((data) => {
        // scrollMessages();
        dispatch({
          type: 'messages/adding/success',
          payload: { ...data, tempId: tempId },
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
    type: 'messages/saved/success',
    payload: data,
  };
};

export const savedIncomingMassage = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'incomingMessages/saved/start',
    });

    api
      .get(`/chat/${message.room_id}/message/${message.data.id}/read`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'incomingMessages/saved/success',
          payload: message,
          data,
        });
        // scrollMessages();
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Санк для удаления сообщения
export const removingMessage = (roomId, messageId) => {
  return (dispatch) => {
    dispatch({
      type: 'messages/delete/start',
    });

    api
      .delete(`/chat/${roomId}/message/${messageId}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'messages/delete/success',
          payload: messageId,
          data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Отправка файла
export const addFile = (file, format, id) => {
  const form = new FormData();
  form.append('file', file);
  form.append('type', format);

  return (dispatch) => {
    dispatch({ type: 'files/post/start', file, format });

    api
      .post(`/chat/${id}/upload`, form, {
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
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'files/post/success',
          payload: data,
          format,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
