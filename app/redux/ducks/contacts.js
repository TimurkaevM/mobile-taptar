import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  contacts: [],
  countNewChat: 0,
  loading: false,
  filter: '',
};

const CONTACTS_LOAD_START = 'contacts/load/start';
const CONTACTS_LOAD_SUCCESS = 'contacts/load/success';
const CONTACTS_LOAD_ERROR = 'contacts/load/error';
const PLUS_MESSAGE = 'plus/messages';
const MINUS_MESSAGE = 'minus/messages';
const COUNT_LOAD_START = 'count/load/start';
const COUNT_LOAD_SUCCESS = 'count/load/success';

export default function contacts(state = initialState, action) {
  switch (action.type) {
    case CONTACTS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case CONTACTS_LOAD_SUCCESS:
      return {
        ...state,
        contacts: action.payload.message,
        loading: false,
      };

    case COUNT_LOAD_SUCCESS:
      return {
        ...state,
        countNewChat: action.payload.message,
        loading: false,
      };

    case 'filter/text':
      return {
        ...state,
        filter: action.payload,
      };

    case MINUS_MESSAGE:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload) {
            return {
              ...contact,
              count_new_messages: 0,
            };
          }

          return contact;
        }),
        countNewChat: state.countNewChat - action.count,
      };

    case PLUS_MESSAGE:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.payload.roomId) {
            return {
              ...contact,
              count_new_messages: contact.count_new_messages + 1,
            };
          }

          return contact;
        }),
        countNewChat: state.countNewChat + 1,
      };

    case 'contact/delete/start':
      return {
        ...state,
        loading: true,
      };

    case 'contact/delete/success':
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload,
        ),
        loading: false,
      };

    default:
      return state;
  }
}

export const loadContacts = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: CONTACTS_LOAD_START,
      });

      if (value !== null) {
        const response = await api.get('chat', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: CONTACTS_LOAD_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
      dispatch({
        type: CONTACTS_LOAD_ERROR,
      });
    }
  };
};

export const loadCountNewChat = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: COUNT_LOAD_START,
      });

      if (value !== null) {
        const response = await api.get('/chat/new/count', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: COUNT_LOAD_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const setFilter = (e) => {
  return {
    type: 'filter/text',
    payload: e,
  };
};

export const minusCountMessages = (id, count) => {
  return {
    type: MINUS_MESSAGE,
    payload: id,
    count,
  };
};

export const plusCountMessages = (data) => {
  return {
    type: PLUS_MESSAGE,
    payload: data,
  };
};

export const removingContact = (roomId) => {
  return (dispatch) => {
    dispatch({
      type: 'contact/delete/start',
    });

    api
      .delete(`/chat/${roomId}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'contact/delete/success',
          payload: roomId,
          data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
