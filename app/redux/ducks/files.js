import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMOVE_FILE_START = 'file/remove/start';
const REMOVE_FILE_SUCCESS = 'file/remove/success';

const REMOVE_FILES_START = 'files/remove/start';
const REMOVE_FILES_SUCCESS = 'files/remove/success';

const ONE_UPLOAD_START = 'one/upload/start';
const ONE_UPLOAD_SUCCESS = 'one/upload/success';

const GROUP_UPLOAD_START = 'group/upload/start';
const GROUP_UPLOAD_SUCCESS = 'group/upload/success';

const TEXT_UPLOAD_START = 'text/upload/start';
const TEXT_UPLOAD_SUCCESS = 'text/upload/success';

const ONE_CHANGE_START = 'one/change/start';
const ONE_CHANGE_SUCCESS = 'one/change/success';

const GROUP_CHANGE_START = 'group/change/start';
const GROUP_CHANGE_SUCCESS = 'group/change/success';

const TEXT_CHANGE_START = 'text/change/start';
const TEXT_CHANGE_SUCCESS = 'text/change/success';

const DRAFT_GET_START = 'draft/load/start';
const DRAFT_GET_SUCCESS = 'draft/load/success';

const CLEAN_TAGS = 'clean/tags';

const initialState = {
  loading: false,
  progress: 0,
  loadingFiles: false,
  title: '',
  year: '',
  author: '',
  location: '',
  comment: '',
  tags_century: [],
  tags_information: [],

  files: {},

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
    case 'title/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          title: action.payload,
        },
      };

    //Изменение текста
    case 'text/change':
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

      case 'text/delete/success':
        return {
          ...state,
          materials: {
            ...state.materials,
            text: {},
          },
        };
  
      case 'text/clear/success':
        return {
          ...state,
          materials: {
            ...state.materials,
            text: {},
          },
        };

    //Изменение тегов
    case 'tag/centuries/change':
      return {
        ...state,
        tags_century: [...state.tags_century, action.payload],
      };

    case 'tag/types/change':
      return {
        ...state,
        tags_information: [...state.tags_information, action.payload],
      };

    case 'tag/centuries/remove':
      return {
        ...state,
        tags_century: state.tags_century.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case 'tag/types/remove':
      return {
        ...state,
        tags_information: state.tags_information.filter(
          (type) => type.id !== action.payload,
        ),
      };

    // Изменение текста
    case 'tag/title/change':
      return {
        ...state,
        title: action.payload,
      };

    case 'tag/place/change':
      return {
        ...state,
        location: action.payload,
      };

    case 'tag/year/change':
      return {
        ...state,
        year: action.payload,
      };

    case 'tag/author/change':
      return {
        ...state,
        author: action.payload,
      };

    case 'tag/comment/change':
      return {
        ...state,
        comment: action.payload,
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
              },
            ],
          },
        },
      };
    //отправка файла на сервер
    case 'file/post/start':
      return {
        ...state,
        loading: true,
      };

    case 'file/post/success':
      return {
        ...state,
        loading: false,
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            one: [action.payload.message],
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

    //очистка files
    case CLEAN_TAGS:
      return {
        ...state,
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
        sendError: false,
      };

    case REMOVE_FILE_START:
      return {
        ...state,
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
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
        files: {},
        title: '',
        year: '',
        author: '',
        location: '',
        comment: '',
        tags_century: [],
        tags_information: [],
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

    case 'files/post/start':
      return {
        ...state,
        loadingFiles: true,
      };

    case 'files/post/success':
      return {
        ...state,
        loadingFiles: false,
        files: action.payload.message,
        progress: 0,
      };

    case DRAFT_GET_START:
      return {
        ...state,
        loading: true,
      };

    case DRAFT_GET_SUCCESS:
      function getGroupFiles(arr) {
        const result = [];
        const object = {};

        for (let i = 0; i < arr.length; i++) {
          if (!result.includes(arr[i].group_uid)) {
            result.push(arr[i].group_uid);
          }
        }

        for (let i = 0; i < result.length; i++) {
          object[result[i]] = {
            group_uid: '',
            type: '',
            files: [],
          };
        }

        for (let i = 0; i < arr.length; i++) {
          object[arr[i].group_uid].group_uid = arr[i].group_uid;
          object[arr[i].group_uid].tags_century = arr[i].tags_century;
          object[arr[i].group_uid].type = arr[i].type;
          object[arr[i].group_uid].title = arr[i].title;
          object[arr[i].group_uid].author = arr[i].author;
          object[arr[i].group_uid].location = arr[i].location;
          object[arr[i].group_uid].tags_information = arr[i].tags_information;
          object[arr[i].group_uid].comment = arr[i].comment;
          object[arr[i].group_uid].year = arr[i].year;
          object[arr[i].group_uid].files.push(arr[i]);
        }
        return Object.values(object);
      }

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

    case 'change/files/tags':
      return {
        ...state,
        title: action.payload.title ? action.payload.title : '',
        year: action.payload.year ? action.payload.year : '',
        author: action.payload.author ? action.payload.author : '',
        location: action.payload.location ? action.payload.location : '',
        comment: action.payload.comment ? action.payload.comment : '',
        tags_century: action.payload.centuries ? action.payload.centuries : [],
        tags_information: action.payload.types ? action.payload.types : [],
      };

    case 'change/files/success':
      if (action.format === 'text') {
        return {
          ...state,
          materials: {
            ...state.materials,
            text: {
              ...state.materials.text,
              title: action.title,
              year: action.year,
              author: action.author,
              location: action.location,
              comment: action.comment,
              tags_century: action.centuries,
              tags_information: action.types,
            },
          },
        };
      }

      if (action.amount === 'one') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              one: state.materials[action.format].one.map((item) => {
                if (item.id === action.id) {
                  item.title = action.title;
                  item.year = action.year;
                  item.author = action.author;
                  item.location = action.location;
                  item.comment = action.comment;
                  item.tags_century = action.centuries;
                  item.tags_information = action.types;
                }

                return item;
              }),
            },
          },
        };
      }

      if (action.amount === 'group') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.format]: {
              ...state.materials[action.format],
              group: state.materials[action.format].group.map((item) => {
                if (item.id === action.id) {
                  item.title = action.title;
                  item.year = action.year;
                  item.author = action.author;
                  item.location = action.location;
                  item.comment = action.comment;
                  item.tags_century = action.centuries;
                  item.tags_information = action.types;
                }

                return item;
              }),
            },
          },
        };
      }

      return state;

    case 'change/progress':
      return {
        ...state,
        progress: action.payload,
      };

    default:
      return state;
  }
}

// Тэги
export const addedCenturies = (value) => {
  return {
    type: 'tag/centuries/change',
    payload: value,
  };
};

export const addedTypes = (value) => {
  return {
    type: 'tag/types/change',
    payload: value,
  };
};

export const removeCenturies = (id) => {
  return {
    type: 'tag/centuries/remove',
    payload: id,
  };
};

export const removeTypes = (id) => {
  return {
    type: 'tag/types/remove',
    payload: id,
  };
};

// Тексты
export const changeTitle = (value) => {
  return {
    type: 'title/change',
    payload: value,
  };
};

export const changeTitleTag = (value) => {
  return {
    type: 'tag/title/change',
    payload: value,
  };
};

export const changePlaceTag = (value) => {
  return {
    type: 'tag/place/change',
    payload: value,
  };
};

export const changeYearTag = (value) => {
  return {
    type: 'tag/year/change',
    payload: value,
  };
};

export const changeAuthorTag = (value) => {
  return {
    type: 'tag/author/change',
    payload: value,
  };
};

export const changeCommentTag = (value) => {
  return {
    type: 'tag/comment/change',
    payload: value,
  };
};

export const changeText = (value) => {
  return {
    type: 'text/change',
    payload: value,
  };
};

//Удаление текста с сервера

export const deleteDraftText = (id) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'text/delete/start' });

      if (value !== null) {
        const response = await api.delete(
          `/user/draft/text/${id}`,
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: 'text/delete/success',
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const clearTextForm = () => {
  return {
    type: 'text/clear/success',
  };
};

// Файлы
export const UploadTextFail = (
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
  file,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: TEXT_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          'user/draft/text',
          {
            text: file,
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: TEXT_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e.response.data);
    }
  };
};

export const UploadOneFail = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: ONE_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          `user/draft/edit/file/${file.id}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: ONE_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          format,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const UploadGroupFails = (
  file,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: GROUP_UPLOAD_START });

      if (value !== null) {
        const response = await api.post(
          `user/draft/edit/group/${file.group}`,
          {
            title: name,
            year,
            author,
            location: place,
            comment,
            tags_century: centuries,
            tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: GROUP_UPLOAD_SUCCESS,
          data: response.data,
          payload: file,
          format,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const cleanStateTags = () => {
  return {
    type: CLEAN_TAGS,
  };
};

export const deleteOneFail = (id, format, amount, groupId) => {
  return (dispatch) => {
    dispatch({
      type: 'file/delete/start',
      payload: id,
      format,
      amount,
      groupId,
    });

    api
      .delete(`/user/draft/file/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'file/delete/success',
          payload: data,
          id,
          format,
          amount,
          groupId,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const removeFiles = (files) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: REMOVE_FILES_START,
      });

      if (value !== null) {
        const response = await api.delete(
          `/user/draft/group/${files.group_uid}`,
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: REMOVE_FILES_SUCCESS,
          payload: files,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeFile = (file) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: REMOVE_FILE_START,
      });

      if (value !== null) {
        const response = await api.delete(`/user/draft/file/${file.id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: REMOVE_FILE_SUCCESS,
          payload: file,
          data: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const postFail = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file[0].uri,
    name: file[0].filename,
    type: 'image/jpeg',
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', file, format, value, form });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFailDocument = (file, format) => {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  });
  form.append('type', format);

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', file, format, value, form });

      if (value !== null) {
        const response = await api.post('/user/draft/file', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postFilesGroup = (files, format, causes) => {
  const form = new FormData();
  form.append('type', format);
  for (let i = 0; i < files.length; i++) {
    form.append(`files[${i}]`, {
      uri: files[i].uri,
      name: files[i].filename,
      type: 'image/jpeg',
    });
  }

  for (let i = 0; i < causes.length; i++) {
    form.append(`causes[${i}]`, causes[i]);
  }

  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: 'files/post/start', files, format, causes });

      if (value !== null) {
        const response = await api.post('/user/draft/group', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${value}`,
          },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length',
                );
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength,
              );
              dispatch({
                type: 'change/progress',
                payload: progress,
              });
            }
          },
        });
        dispatch({
          type: 'files/post/success',
          payload: response.data,
          format,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getDraftFiles = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: DRAFT_GET_START,
      });

      if (value !== null) {
        const response = await api.get('user/drafts', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: DRAFT_GET_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

//Изменение принадлежностей файлов

export const ChangeFilesTags = (file) => {
  return {
    type: 'change/files/tags',
    payload: file,
  };
};

export const changeTextFile = (
  file,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: TEXT_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/text/${file.id}`,
          {
            text: file.text,
        title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: centuries,
        tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: TEXT_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeOneFile = (
  id,
  format,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: ONE_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/file/${id}`,
          {
            title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: centuries,
        tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: ONE_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
          format,
          id,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeGroupFiles = (
  format,
  group,
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({ type: GROUP_CHANGE_START });

      if (value !== null) {
        const response = await api.post(
          `/user/draft/edit/group/${group}`,
          {
            title: name,
        year,
        author,
        location: place,
        comment,
        tags_century: centuries,
        tags_information: types,
          },
          {
            headers: { Authorization: `Bearer ${value}` },
          },
        );
        dispatch({
          type: GROUP_CHANGE_SUCCESS,
          data: response.data,
          name,
          year,
          author,
          place,
          comment,
          centuries,
          types,
          group,
          format,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

// api/user/add/material/send

export const postMaterial = (title, text, photo, document, video, audio) => {
  return (dispatch) => {
    dispatch({ type: 'material/post/start' });

    api
      .post(
        '/user/contribution/material/send',
        { title, text, photo, document, audio, video },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'material/post/success',
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
