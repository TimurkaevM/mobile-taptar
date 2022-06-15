import { getGroupFiles } from '../helper/helper';

export const CHANGE_TITLE = 'title/change';
export const CHANGE_TEXT = 'text/change';
export const TEXT_DELETE_START = 'text/delete/start';
export const TEXT_DELETE_SUCCESS = 'text/delete/success';
export const TEXT_CLEAR = 'text/clear/success';
export const REMOVE_FILE_START = 'file/remove/start';
export const REMOVE_FILE_SUCCESS = 'file/remove/success';
export const REMOVE_FILES_START = 'files/remove/start';
export const REMOVE_FILES_SUCCESS = 'files/remove/success';
export const ONE_UPLOAD_START = 'one/upload/start';
export const ONE_UPLOAD_SUCCESS = 'one/upload/success';
export const GROUP_UPLOAD_START = 'group/upload/start';
export const GROUP_UPLOAD_SUCCESS = 'group/upload/success';
export const TEXT_UPLOAD_START = 'text/upload/start';
export const TEXT_UPLOAD_SUCCESS = 'text/upload/success';
export const ONE_CHANGE_START = 'one/change/start';
export const ONE_CHANGE_SUCCESS = 'one/change/success';
export const GROUP_CHANGE_START = 'group/change/start';
export const GROUP_CHANGE_SUCCESS = 'group/change/success';
export const TEXT_CHANGE_START = 'text/change/start';
export const TEXT_CHANGE_SUCCESS = 'text/change/success';
export const DRAFT_GET_START = 'draft/load/start';
export const DRAFT_GET_SUCCESS = 'draft/load/success';
export const DRAFT_GET_ERROR = 'draft/load/error';
export const DRAFT_CHANGE_ERROR = 'draft/change/error';
export const MATERIA_POST_START = 'material/post/start';
export const MATERIA_POST_SUCCESS = 'material/post/success';
export const MATERIA_POST_ERROR = 'material/post/error';
export const SEND_ERROR_CHANGE = 'send/error/change';

const initialState = {
  loading: false,
  sendError: false,
  draftError: false,
  materials: {
    title: '',

    text: {},

    photo: {
      one: [],
      group: [],
    },

    audio: {
      one: [],
      group: [],
    },

    document: {
      one: [],
      group: [],
    },

    video: {
      one: [],
      group: [],
    },
  },
};

export default function files(state = initialState, action) {
  switch (action.type) {
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

    //Добавление текста
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
            author: action.author,
            location: action.place,
            comment: action.comment,
            tags_century: action.centuries,
            tags_information: action.types,
            type: 'text',
          },
        },
      };

    //добавление одного файла
    case ONE_UPLOAD_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            one: [
              ...state.materials[action.format].one,
              {
                id: action.payload.id,
                path: action.payload.path,
                type: action.payload.type,
                title: action.name,
                year: action.year,
                author: action.author,
                location: action.place,
                comment: action.comment,
                tags_century: action.centuries,
                tags_information: action.types,
                type: action.format,
              },
            ],
          },
        },
      };

    //Удаление файла
    case 'file/delete/success':
      if (action.amount === 'one') {
        if (action.format === 'image') {
          return {
            ...state,
            materials: {
              ...state.materials,
              photo: {
                ...state.materials.photo,
                one: state.materials.photo.one.filter(
                  (item) => item.id !== action.id,
                ),
              },
            },
          };
        }
        if (action.format === 'application') {
          return {
            ...state,
            materials: {
              ...state.materials,
              document: {
                ...state.materials.document,
                one: state.materials.document.one.filter(
                  (item) => item.id !== action.id,
                ),
              },
            },
          };
        }
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              one: state.materials[action.format].one.filter(
                (item) => item.id !== action.id,
              ),
            },
          },
        };
      }

      if (action.amount === 'group') {
        if (action.format === 'image') {
          return {
            ...state,
            materials: {
              ...state.materials,
              photo: {
                ...state.materials.photo,
                group: state.materials.photo.group
                  .map((item) => {
                    if (action.groupId === item.group) {
                      return {
                        ...item,
                        files: item.files.filter(
                          (item) => item.id !== action.id,
                        ),
                      };
                    }

                    return item;
                  })
                  .filter((item) => item.files.length !== 0),
              },
            },
          };
        }
        if (action.format === 'application') {
          return {
            ...state,
            materials: {
              ...state.materials,
              document: {
                ...state.materials.document,
                group: state.materials.document.group
                  .map((item) => {
                    if (action.groupId === item.group) {
                      return {
                        ...item,
                        files: item.files.filter(
                          (item) => item.id !== action.id,
                        ),
                      };
                    }

                    return item;
                  })
                  .filter((item) => item.files.length !== 0),
              },
            },
          };
        }
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              group: state.materials[action.format].group
                .map((item) => {
                  if (action.groupId === item.group) {
                    return {
                      ...item,
                      files: item.files.filter((item) => item.id !== action.id),
                    };
                  }

                  return item;
                })
                .filter((item) => item.files.length !== 0),
            },
          },
        };
      }

      return state;

    case REMOVE_FILE_START:
      return {
        ...state,
      };

    case REMOVE_FILE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.payload.type]: {
            ...state.materials[action.payload.type],
            one: state.materials[action.payload.type].one.filter(
              (item) => item.id !== action.payload.id,
            ),
          },
        },
      };

    case REMOVE_FILES_START:
      return {
        ...state,
      };

    case REMOVE_FILES_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.payload.type]: {
            ...state.materials[action.payload.type],
            group: state.materials[action.payload.type].group.filter(
              (item) => action.payload.group_uid !== item.group_uid,
            ),
          },
        },
      };

    //добавление группы файлов
    case GROUP_UPLOAD_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            group: [
              ...state.materials[action.format].group,
              {
                group_uid: action.payload.group,
                files: action.payload.files,
                title: action.name,
                year: action.year,
                author: action.author,
                location: action.place,
                comment: action.comment,
                tags_century: action.centuries,
                tags_information: action.types,
                type: action.format,
              },
            ],
          },
        },
      };
    //Change files
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
            tags_century: action.centuries,
            tags_information: action.types,
          },
        },
      };

    case ONE_CHANGE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            one: state.materials[action.format].one.map((item) => {
              if (item.id === action.id) {
                item.title = action.name;
                item.year = action.year;
                item.author = action.author;
                item.location = action.place;
                item.comment = action.comment;
                item.tags_century = action.centuries;
                item.tags_information = action.types;
              }

              return item;
            }),
          },
        },
      };

    case GROUP_CHANGE_SUCCESS:
      return {
        ...state,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            group: state.materials[action.format].group.map((item) => {
              if (item.group_uid === action.group) {
                item.title = action.name;
                item.year = action.year;
                item.author = action.author;
                item.location = action.place;
                item.comment = action.comment;
                item.tags_century = action.centuries;
                item.tags_information = action.types;
              }

              return item;
            }),
          },
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
          text: action.payload.message.text,
          photo: {
            one: action.payload.message.photo.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.photo.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          audio: {
            one: action.payload.message.audio.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.audio.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          document: {
            one: action.payload.message.document.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.document.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },

          video: {
            one: action.payload.message.video.filter(
              (item) => item.group_uid === null,
            ),
            group: getGroupFiles(
              action.payload.message.video.filter(
                (item) => item.group_uid !== null,
              ),
            ),
          },
        },
      };

    case DRAFT_GET_ERROR:
      return {
        ...state,
        loading: false,
        draftError: true,
      };

    case DRAFT_CHANGE_ERROR:
      return {
        ...state,
        draftError: false,
      };

    case MATERIA_POST_START:
      return {
        ...state,
        loading: true,
      };

    case MATERIA_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        progress: 0,
        loadingFiles: false,
        files: {},

        materials: {
          title: '',

          text: {
            text: '',
          },

          photo: {
            one: [],
            group: [],
          },

          audio: {
            one: [],
            group: [],
          },

          document: {
            one: [],
            group: [],
          },

          video: {
            one: [],
            group: [],
          },
        },
      };

    case MATERIA_POST_ERROR:
      return {
        ...state,
        loading: false,
        sendError: true,
      };

    case SEND_ERROR_CHANGE:
      return {
        ...state,
        sendError: false,
      };

    default:
      return state;
  }
}

// export const deleteOneFail = (id, format, amount, groupId) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'file/delete/start',
//       payload: id,
//       format,
//       amount,
//       groupId,
//     });

//     api
//       .delete(`/user/draft/file/${id}`, {
//         headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
//       })
//       .then((response) => response.data)
//       .then((data) => {
//         dispatch({
//           type: 'file/delete/success',
//           payload: data,
//           id,
//           format,
//           amount,
//           groupId,
//         });
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };
// };
