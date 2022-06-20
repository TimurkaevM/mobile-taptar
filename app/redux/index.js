import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import sendMaterial from './ducks/sendMaterial';
import tags from './ducks/tags';
import user from './ducks/user';
import contacts from './ducks/contacts';
import messages from './ducks/messages';
import contributionAudio from './ducks/contributionAudio';
import contributionDocument from './ducks/contributionDocument';
import contributionMaterial from './ducks/contributionMaterial';
import contributionPhoto from './ducks/contributionPhoto';
import contributionVideo from './ducks/contributionVideo';
import application from './ducks/application';
import historianMaterial from './ducks/historianMaterial';
import cabinetMaterial from './ducks/cabinetMaterial';
import showFileCabinet from './ducks/showFileCabinet';
import userTags from './ducks/userTags';
import uploadFiles from './ducks/uploadFiles';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const rootReducer = combineReducers({
  sendMaterial,
  historianMaterial,
  user,
  uploadFiles,
  contributionAudio,
  contributionDocument,
  contributionMaterial,
  contributionPhoto,
  contributionVideo,
  tags,
  userTags,
  contacts,
  application,
  messages,
  cabinetMaterial,
  showFileCabinet,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
