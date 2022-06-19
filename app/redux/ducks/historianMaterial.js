import { api } from '../../api/api';

export const CHANGED_IS_MATERIAL = 'changed/isMaterial/historian';
export const CHANGE_TITLE = 'historian/title/change';
export const CHANGE_TEXT = 'historian/text/change';
export const TEXT_DELETE_START = 'historian/text/delete/start';
export const TEXT_DELETE_SUCCESS = 'historian/text/delete/success';
export const TEXT_CLEAR = 'historian/text/clear/success';
export const REMOVE_FILE_START = 'historian/file/remove/start';
export const REMOVE_FILE_SUCCESS = 'historian/file/remove/success';
export const REMOVE_FILES_START = 'historian/files/remove/start';
export const REMOVE_FILES_SUCCESS = 'historian/files/remove/success';
export const ONE_UPLOAD_START = 'historian/one/upload/start';
export const ONE_UPLOAD_SUCCESS = 'historian/one/upload/success';
export const GROUP_UPLOAD_START = 'historian/group/upload/start';
export const GROUP_UPLOAD_SUCCESS = 'historian/group/upload/success';
export const TEXT_UPLOAD_START = 'historian/text/upload/start';
export const TEXT_UPLOAD_SUCCESS = 'historian/text/upload/success';
export const ONE_CHANGE_START = 'historian/one/change/start';
export const ONE_CHANGE_SUCCESS = 'historian/one/change/success';
export const GROUP_CHANGE_START = 'historian/group/change/start';
export const GROUP_CHANGE_SUCCESS = 'historian/group/change/success';
export const TEXT_CHANGE_START = 'historian/text/change/start';
export const TEXT_CHANGE_SUCCESS = 'historian/text/change/success';
export const DRAFT_GET_START = 'historian/draft/load/start';
export const DRAFT_GET_SUCCESS = 'historian/draft/load/success';
export const DRAFT_GET_ERROR = 'historiandraft/load/error';
export const DRAFT_CHANGE_ERROR = 'historian/draft/change/error';
export const MATERIA_POST_START = 'historian/material/post/start';
export const MATERIA_POST_SUCCESS = 'historian/material/post/success';
export const MATERIA_POST_ERROR = 'historian/material/post/error';
export const SEND_ERROR_CHANGE = 'historian/send/error/change';

const initialState = {
  loading: false,
  sendError: false,
  draftError: false,
  materials: {
    is_material: false,
    bookmark: false,

    title: '',

    text: {},

    photo: [],

    audio: [],

    document: [],

    video: [],
  },
};

export default function historianMaterial(state = initialState, action) {
  switch (action.type) {
    //Изменение bookmark
    case 'historian/bookmark/material/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          bookmark: !state.materials.bookmark,
        },
      };

    //Изменение заголовка
    case CHANGE_TITLE:
      return {
        ...state,
        materials: {
          ...state.materials,
          title: action.payload,
        },
      };

    //Изменение текста
    case CHANGE_TEXT:
      if (action.payload.length === 0) {
        return {
          ...state,
          materials: {
            ...state.materials,
            text: {},
          },
        };
      }

      return {
        ...state,
        materials: {
          ...state.materials,
          text: { ...state.materials.text, text: action.payload },
        },
      };

    case TEXT_DELETE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          text: {},
        },
      };

    case TEXT_CLEAR:
      return {
        ...state,
        materials: {
          ...state.materials,
          text: {},
        },
      };

    //Добавление одного файла
    case TEXT_UPLOAD_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          text: {
            ...state.materials.text,
            id: action.data.message.id,
            text: action.payload,
            title: action.name,
            year: action.year,
            location: action.place,
            author: action.author,
            comment: action.comment,
            tags_century: action.centuries,
            tags_credibility: action.credibility,
            tags_information: action.types,
            effects: action.effects,
            bookmark: action.bookmark,
            albums: action.albums,
          },
        },
      };

    //добавление одного файла
    case ONE_UPLOAD_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: [
            ...state.materials[action.format],
            {
              processed: true,
              id: action.payload.id,
              path: action.payload.path,
              type: action.payload.type,
              title: action.name,
              year: action.year,
              author: action.author,
              location: action.place,
              comment: action.comment,
              tags_century: action.centuries,
              tags_credibility: action.credibility,
              tags_information: action.types,
              effects: action.effects,
              bookmark: action.bookmark,
              albums: action.albums,
            },
          ],
        },
      };

    //Удаление файла
    case REMOVE_FILE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: state.materials[action.format].filter(
            (item) => item.id !== action.id,
          ),
        },
      };

    case 'historian/files/clear/success':
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.payload.type]: state.materials[action.payload.type].filter(
            (item) => item.id !== action.payload.id,
          ),
        },
      };

    case DRAFT_GET_START:
      return {
        ...state,
        loading: true,
      };

    case DRAFT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: {
          ...state.materials,
          text: {
            ...action.payload.message.text,
            effects: [],
            bookmark: false,
            albums: [],
          },
          photo: action.payload.message.photo.map((item) => {
            return {
              ...item,
              effects: [],
              bookmark: false,
              albums: [],
            };
          }),

          audio: action.payload.message.audio.map((item) => {
            return {
              ...item,
              effects: [],
              bookmark: false,
              albums: [],
            };
          }),

          document: action.payload.message.document.map((item) => {
            return {
              ...item,
              effects: [],
              bookmark: false,
              albums: [],
            };
          }),

          video: action.payload.message.video.map((item) => {
            return {
              ...item,
              effects: [],
              bookmark: false,
              albums: [],
            };
          }),
        },
      };

    // изменение принадлежностей файлов
    case TEXT_CHANGE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          text: {
            ...state.materials.text,
            title: action.name,
            year: action.year,
            author: action.author,
            location: action.place,
            comment: action.comment,
            text: action.localEffects.text,
            tags_century: action.century,
            tags_information: action.information,
            tags_credibility: action.credibility,
            effects: action.localEffects.effects,
            bookmark: action.bookmark,
            albums: action.albums,
          },
        },
      };

    case ONE_CHANGE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: state.materials[action.format].map((item) => {
            if (item.id === action.id) {
              item.processed = true;
              item.title = action.name;
              item.year = action.year;
              item.author = action.author;
              item.location = action.place;
              item.comment = action.comment;
              item.tags_century = action.century;
              item.tags_information = action.information;
              item.effects = action.localEffects.effects;
              item.tags_credibility = action.credibility;
              item.bookmark = action.bookmark;
              item.albums = action.albums;
            }

            return item;
          }),
        },
      };

    // отправка материала
    case MATERIA_POST_SUCCESS:
      return {
        loading: false,
        sendError: false,
        draftError: false,
        materials: {
          is_material: false,
          bookmark: false,

          title: '',

          text: {},

          photo: [],

          audio: [],

          document: [],

          video: [],
        },
      };

    //Изменение целостности материала
    case CHANGED_IS_MATERIAL:
      return {
        ...state,
        materials: {
          ...state.materials,
          is_material: !state.materials.is_material,
        },
      };

    default:
      return state;
  }
}

// Тэги
export const addedCenturies = (value) => {
  return {
    type: 'historian/tag/centuries/change',
    payload: value,
  };
};

export const addedTypes = (value) => {
  return {
    type: 'historian/tag/types/change',
    payload: value,
  };
};

export const removeCenturies = (id) => {
  return {
    type: 'historian/tag/centuries/remove',
    payload: id,
  };
};

export const removeTypes = (id) => {
  return {
    type: 'historian/tag/types/remove',
    payload: id,
  };
};

// Тексты
export const changeTitle = (value) => {
  return {
    type: 'historian/title/change',
    payload: value,
  };
};

export const changeTitleTag = (value) => {
  return {
    type: 'historian/tag/title/change',
    payload: value,
  };
};

export const changePlaceTag = (value) => {
  return {
    type: 'historian/tag/place/change',
    payload: value,
  };
};

export const changeYearTag = (value) => {
  return {
    type: 'historian/tag/year/change',
    payload: value,
  };
};

export const changeBookmarkMaterial = () => {
  return {
    type: 'historian/bookmark/material/change',
  };
};

export const changeAuthorTag = (value) => {
  return {
    type: 'historian/tag/author/change',
    payload: value,
  };
};

export const changeCommentTag = (value) => {
  return {
    type: 'historian/tag/comment/change',
    payload: value,
  };
};

export const changeText = (value) => {
  return {
    type: 'historian/text/change',
    payload: value,
  };
};

// Файлы
export const UploadOneFail = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  bookmark,
  albums,
  centuries,
  types,
  effects,
  credibility,
) => {
  return (dispatch) => {
    dispatch({ type: 'historian/one/upload/start' });

    api
      .post(`/cabinet/material/send/draft/edit/file/${file.id}`, {
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: centuries,
        tags_information: types,
        tags_credibility: credibility,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/one/upload/success',
          payload: file,
          format,
          name,
          year,
          author,
          place,
          comment,
          bookmark,
          albums,
          centuries,
          types,
          effects,
          credibility,
          data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const UploadTextFail = (
  name,
  year,
  author,
  place,
  comment,
  bookmark,
  albums,
  centuries,
  types,
  file,
  effects,
  credibility,
) => {
  return (dispatch) => {
    dispatch({ type: 'historian/text/upload/start' });

    api
      .post('/cabinet/material/send/draft/text', {
        text: file,
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: centuries,
        tags_information: types,
        tags_credibility: credibility,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/text/upload/success',
          payload: file,
          name,
          year,
          author,
          place,
          comment,
          bookmark,
          albums,
          centuries,
          types,
          effects,
          credibility,
          data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const RemoveStateTags = () => {
  return {
    type: 'historian/state/tags/remove',
  };
};

export const deleteOneFail = (id, format) => {
  return (dispatch) => {
    dispatch({
      type: 'historian/file/delete/start',
      payload: id,
    });

    api
      .delete(`/cabinet/material/send/draft/file/${id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/file/delete/success',
          payload: data,
          id,
          format,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const clearFiles = (files) => {
  return (dispatch) => {
    dispatch({
      type: 'historian/files/clear/start',
      files,
    });

    api
      .delete(`/cabinet/material/send/draft/file/${files.id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/files/clear/success',
          payload: files,
          message: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Изменение принадлежностей файлов

export const ChangeFilesTags = (file) => {
  return {
    type: 'historian/change/files/tags',
    payload: file,
  };
};

// api/user/add/material/send

export const postHistorianMaterial = (
  bookmark,
  is_material,
  title,
  text,
  photo,
  document,
  audio,
  video,
) => {
  return (dispatch) => {
    dispatch({ type: '/user/contribution/material/send' });

    if (text.text === undefined) {
      api
        .post('/cabinet/material/send', {
          bookmark,
          is_material,
          title,
          photo,
          document,
          audio,
          video,
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'historian/material/post/success',
            payload: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      api
        .post('/cabinet/material/send', {
          bookmark,
          is_material,
          title,
          text,
          photo,
          document,
          audio,
          video,
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'historian/material/post/success',
            payload: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
};

export const ChangeTextFile = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  bookmark,
  albums,
  information,
  century,
  credibility,
  localEffects,
) => {
  return (dispatch) => {
    dispatch({ type: HISTORIAN_CHANGE_TEXT_START });

    api
      .post(`/cabinet/material/send/draft/edit/text/${file.id}`, {
        text: file.text,
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: century,
        tags_information: information,
        tags_credibility: credibility,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: HISTORIAN_CHANGE_TEXT_SUCCESS,
          data: data,
          format,
          name,
          year,
          author,
          place,
          comment,
          bookmark,
          albums,
          information,
          century,
          credibility,
          localEffects,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const ChangeOneFile = (
  id,
  format,
  name,
  year,
  author,
  place,
  comment,
  bookmark,
  albums,
  information,
  century,
  credibility,
  localEffects,
) => {
  return (dispatch) => {
    dispatch({ type: HISTORIAN_CHANGE_FILE_START });

    api
      .post(`/cabinet/material/send/draft/edit/file/${id}`, {
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: century,
        tags_information: information,
        tags_credibility: credibility,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: HISTORIAN_CHANGE_FILE_SUCCESS,
          data: data,
          id,
          format,
          name,
          year,
          author,
          place,
          comment,
          bookmark,
          albums,
          information,
          century,
          credibility,
          localEffects,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const ChangeGroupFiles = (
  format,
  amount,
  group,
  name,
  year,
  author,
  place,
  comment,
  bookmark,
  albums,
  information,
  century,
  credibility,
  localEffects,
) => {
  return (dispatch) => {
    dispatch({ type: HISTORIAN_CHANGE_FILES_START });

    api
      .post(`/cabinet/material/send/draft/edit/group/${group}`, {
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: century,
        tags_information: information,
        tags_credibility: credibility,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: HISTORIAN_CHANGE_FILES_SUCCESS,
          data: data,
          format,
          amount,
          group,
          name,
          year,
          author,
          place,
          comment,
          bookmark,
          albums,
          information,
          century,
          credibility,
          localEffects,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Удаление текста с сервера

export const deleteDraftText = (id) => {
  return (dispatch) => {
    dispatch({ type: HISTORIAN_TEXT_DELETE_START });

    api
      .delete(`/cabinet/material/send/draft/text/${id}`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: HISTORIAN_TEXT_DELETE_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const clearTextForm = () => {
  return {
    type: HISTORIAN_TEXT_CLEAR_SUCCESS,
  };
};
