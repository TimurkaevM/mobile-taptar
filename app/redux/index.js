import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import files from './ducks/files';
import tags from './ducks/tags';
import user from './ducks/user';
import contacts from './ducks/contacts';
import messages from './ducks/messages';
import contribution from './ducks/contribution';
import workshop from './ducks/workshop';
import historianCabinet from './ducks/historianCabinet';
import historianSend from './ducks/historianSend';
import incomingMaterials from './ducks/incomingMaterials';
import approver from './ducks/approver';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const rootReducer = combineReducers({
  workshop,
  files,
  user,
  contribution,
  tags,
  contacts,
  messages,
  // incomingMaterials,
  // historianCabinet,
  // historianSend,
  // approver,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
