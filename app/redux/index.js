import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import files from './ducks/files';
import tags from './ducks/tags';
import user from './ducks/user';
import contacts from './ducks/contacts';
import messages from './ducks/messages';
import contributionAudio from './ducks/contributionAudio';
import contributionDocument from './ducks/contributionDocument';
import contributionMaterial from './ducks/contributionMaterial';
import contributionPhoto from './ducks/contributionPhoto';
import contributionVideo from './ducks/contributionVideo';
import workshop from './ducks/workshop';
import application from './ducks/application';
import historianCabinet from './ducks/historianCabinet';
import historianSend from './ducks/historianSend';
import incomingMaterials from './ducks/incomingMaterials';
import cabinetMaterial from './ducks/cabinetMaterial';
import showFileCabinet from './ducks/showFileCabinet';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const rootReducer = combineReducers({
  workshop,
  files,
  user,
  contributionAudio,
  contributionDocument,
  contributionMaterial,
  contributionPhoto,
  contributionVideo,
  tags,
  contacts,
  application,
  messages,
  cabinetMaterial,
  showFileCabinet,
  // historianCabinet,
  // historianSend,
  // approver,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
