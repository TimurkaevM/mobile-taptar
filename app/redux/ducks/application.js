const initialState = {
  sendModalDelete: {
    open: false,
    item: null,
  },
  passModal: false,
};

const SEND_OPEN_MODAL_DELETE = 'send/open/modal/delete';
const SEND_CLOSE_MODAL_DELETE = 'send/close/modal/delete';

const PASS_MODAL_OPEN = 'pass/modal/open';
const PASS_MODAL_CLOSE = 'pass/modal/close';

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

    case PASS_MODAL_OPEN:
      return {
        ...state,
        passModal: true,
      };

    case PASS_MODAL_CLOSE:
      return {
        ...state,
        passModal: false,
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

export const openPassModal = () => {
  return {
    type: PASS_MODAL_OPEN,
  };
};

export const closePassModal = () => {
  return {
    type: PASS_MODAL_CLOSE,
  };
};
