const initialState = {
  sendModalDelete: {
    open: false,
    item: null,
  },
};

const SEND_OPEN_MODAL_DELETE = 'send/open/modal/delete';
const SEND_CLOSE_MODAL_DELETE = 'send/close/modal/delete';

export default function application(state = initialState, action) {
  switch (action.type) {
    case SEND_OPEN_MODAL_DELETE:
      return {
        ...state,
        sendModalDelete: {
          open: true,
          item: action.payload,
        },
      };

    case SEND_CLOSE_MODAL_DELETE:
      return {
        ...state,
        sendModalDelete: {
          open: false,
          item: null,
        },
      };

    default:
      return state;
  }
}

export const openSendModalDelete = (item) => {
  return {
    type: SEND_OPEN_MODAL_DELETE,
    payload: item,
  };
};

export const closeSendModalDelete = () => {
  return {
    type: SEND_CLOSE_MODAL_DELETE,
  };
};
