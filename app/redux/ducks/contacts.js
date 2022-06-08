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

    case 'count/load/success':
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

    case 'minus/messages':
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

    case 'plus/messages':
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
  return (dispatch) => {
    dispatch({
      type: 'count/load/start',
    });

    api
      .get('/chat/new/count')
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'count/load/success',
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
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
    type: 'minus/messages',
    payload: id,
    count,
  };
};

export const plusCountMessages = (data) => {
  return {
    type: 'plus/messages',
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
