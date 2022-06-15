import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CENTURIES_CHANGE = 'tag/centuries/change';
const CENTURIES_REMOVE = 'tag/centuries/remove';
const INFORMATION_CHANGE = 'tag/types/change';
const INFORMATION_REMOVE = 'tag/types/remove';
const TITLE_CHANGE = 'tag/title/change';
const LOCATION_CHANGE = 'tag/place/change';
const AUTHOR_CHANGE = 'tag/author/change';
const COMMENT_CHANGE = 'tag/comment/change';
const YEAR_CHANGE = 'tag/year/change';
const CLEAN_TAGS = 'clean/tags';

const initialState = {
  title: '',
  year: '',
  author: '',
  location: '',
  comment: '',
  tags_century: [],
  tags_information: [],
};

export default function userTags(state = initialState, action) {
  switch (action.type) {
    //Изменение тегов
    case CENTURIES_CHANGE:
      return {
        ...state,
        tags_century: [...state.tags_century, action.payload],
      };

    case INFORMATION_CHANGE:
      return {
        ...state,
        tags_information: [...state.tags_information, action.payload],
      };

    case CENTURIES_REMOVE:
      return {
        ...state,
        tags_century: state.tags_century.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case INFORMATION_REMOVE:
      return {
        ...state,
        tags_information: state.tags_information.filter(
          (type) => type.id !== action.payload,
        ),
      };

    // Изменение текста
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.payload,
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };

    case YEAR_CHANGE:
      return {
        ...state,
        year: action.payload,
      };

    case AUTHOR_CHANGE:
      return {
        ...state,
        author: action.payload,
      };

    case COMMENT_CHANGE:
      return {
        ...state,
        comment: action.payload,
      };

    //очистка files
    case CLEAN_TAGS:
      return {
        ...state,
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
      };

    default:
      return state;
  }
}

// Тэги
export const addedCenturies = (value) => {
  return {
    type: CENTURIES_CHANGE,
    payload: value,
  };
};

export const addedTypes = (value) => {
  return {
    type: INFORMATION_CHANGE,
    payload: value,
  };
};

export const removeCenturies = (id) => {
  return {
    type: CENTURIES_REMOVE,
    payload: id,
  };
};

export const removeTypes = (id) => {
  return {
    type: INFORMATION_REMOVE,
    payload: id,
  };
};

export const changeTitleTag = (value) => {
  return {
    type: TITLE_CHANGE,
    payload: value,
  };
};

export const changePlaceTag = (value) => {
  return {
    type: LOCATION_CHANGE,
    payload: value,
  };
};

export const changeYearTag = (value) => {
  return {
    type: YEAR_CHANGE,
    payload: value,
  };
};

export const changeAuthorTag = (value) => {
  return {
    type: AUTHOR_CHANGE,
    payload: value,
  };
};

export const changeCommentTag = (value) => {
  return {
    type: COMMENT_CHANGE,
    payload: value,
  };
};

export const cleanStateTags = () => {
  return {
    type: CLEAN_TAGS,
  };
};
