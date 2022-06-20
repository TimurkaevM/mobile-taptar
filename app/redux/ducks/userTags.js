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
const BOOKMARK_CHANGE = 'historian/bookmark/change';
const EFFECTS_ADDED = 'historian/tag/effects/added';
const EFFECTS_REMOVE = 'historian/tag/effects/remove';
const EFFECTS_CHANGE = 'historian/tag/effects/change';
const ALBUMS_ADDED = 'historian/albums/added';
const ALBUMS_REMOVE = 'historian/albums/remove';
const CREDIBILITY_ADDED = 'historian/tag/credibility/change';
const CREDIBILITY_REMOVE = 'historian/tag/credibility/remove';

const initialState = {
  title: '',
  year: '',
  author: '',
  location: '',
  comment: '',
  tags_century: [],
  tags_information: [],
  tags_credibility: [],
  effects: [],
  bookmark: false,
  albums: [],
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

    case BOOKMARK_CHANGE:
      return {
        ...state,
        bookmark: !state.bookmark,
      };

    case EFFECTS_ADDED:
      return {
        ...state,
        effects: [...state.effects, action.payload],
      };

    case EFFECTS_CHANGE:
      return {
        ...state,
        effects: state.effects.map((effect) => {
          if (effect.id === action.payload.id) {
            return {
              ...effect,
              comment: action.payload.comment,
            };
          }

          return effect;
        }),
      };

    case EFFECTS_REMOVE:
      return {
        ...state,
        effects: state.effects.filter((effect) => effect.id !== action.payload),
      };

    case CREDIBILITY_ADDED:
      return {
        ...state,
        tags_credibility: [...state.tags_credibility, action.payload],
      };

    case CREDIBILITY_REMOVE:
      return {
        ...state,
        tags_credibility: state.tags_credibility.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case ALBUMS_ADDED:
      return {
        ...state,
        albums: [...state.albums, action.payload],
      };

    case ALBUMS_REMOVE:
      return {
        ...state,
        albums: state.albums.filter((album) => album.id !== action.payload),
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
        tags_credibility: [],
        effects: [],
        bookmark: false,
        albums: [],
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

export const changeBookmarkFile = () => {
  return {
    type: BOOKMARK_CHANGE,
  };
};

export const addedEffects = (value) => {
  return {
    type: EFFECTS_ADDED,
    payload: value,
  };
};

export const changedEffects = (value) => {
  return {
    type: EFFECTS_CHANGE,
    payload: value,
  };
};

export const removeEffects = (id) => {
  return {
    type: EFFECTS_REMOVE,
    payload: id,
  };
};

export const addAlbumsInSend = (value) => {
  return {
    type: ALBUMS_ADDED,
    payload: value,
  };
};

export const removeAlbumsInSend = (id) => {
  return {
    type: ALBUMS_REMOVE,
    payload: id,
  };
};

export const addedCredibility = (value) => {
  return {
    type: CREDIBILITY_ADDED,
    payload: value,
  };
};

export const removeCredibility = (id) => {
  return {
    type: CREDIBILITY_REMOVE,
    payload: id,
  };
};

export const cleanStateTags = () => {
  return {
    type: CLEAN_TAGS,
  };
};
