const initialState = {
  sendModalDelete: {
    open: false,
    item: null,
  },
  deleteMessageModal: {
    open: false,
    roomId: null,
    id: null,
  },
  passModal: false,
  chatModal: false,
};

const SEND_OPEN_MODAL_DELETE = 'send/open/modal/delete';
const SEND_CLOSE_MODAL_DELETE = 'send/close/modal/delete';

const MESSAGE_OPEN_MODAL_DELETE = 'message/open/modal/delete';
const MESSAGE_CLOSE_MODAL_DELETE = 'message/close/modal/delete';

const PASS_MODAL_OPEN = 'pass/modal/open';
const PASS_MODAL_CLOSE = 'pass/modal/close';

const CHAT_MODAL_OPEN = 'chat/modal/open';
const CHAT_MODAL_CLOSE = 'chat/modal/close';

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

    case MESSAGE_OPEN_MODAL_DELETE:
      return {
        ...state,
        deleteMessageModal: {
          open: true,
          roomId: action.roomId,
          id: action.id,
        },
      };

    case MESSAGE_CLOSE_MODAL_DELETE:
      return {
        ...state,
        deleteMessageModal: {
          open: false,
          roomId: null,
          id: null,
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

    case CHAT_MODAL_OPEN:
      return {
        ...state,
        chatModal: true,
      };

    case CHAT_MODAL_CLOSE:
      return {
        ...state,
        chatModal: false,
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

export const openMessageModalDelete = (roomId, id) => {
  return {
    type: MESSAGE_OPEN_MODAL_DELETE,
    roomId,
    id,
  };
};

export const closeMessageModalDelete = () => {
  return {
    type: MESSAGE_CLOSE_MODAL_DELETE,
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

export const openChatModal = () => {
  return {
    type: CHAT_MODAL_OPEN,
  };
};

export const closeChatModal = () => {
  return {
    type: CHAT_MODAL_CLOSE,
  };
};
