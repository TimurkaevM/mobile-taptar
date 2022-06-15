import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHANGE_SEND__MATERIAL = 'historian/change/files/success';

const CHANGED_IS_MATERIAL = 'changed/isMaterial/historian';

const initialState = {
  loading: false,
  progress: 0,
  loadingFiles: false,
  name: '',
  year: '',
  place: '',
  author: '',
  comment: '',
  centuries: [],
  types: [],
  credibility: [],
  effects: [],

  files: {},

  materials: {
    isMaterial: false,

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

export default function historianSend(state = initialState, action) {
  switch (action.type) {
    //Изменение заголовка
    case 'historian/title/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          title: action.payload,
        },
      };

    //Изменение текста
    case 'historian/text/change':
      return {
        ...state,
        materials: {
          ...state.materials,
          text: { ...state.materials.text, text: action.payload },
        },
      };

    //Изменение тегов
    case 'historian/tag/centuries/change':
      return {
        ...state,
        centuries: [...state.centuries, action.payload],
      };

    case 'historian/tag/effects/added':
      return {
        ...state,
        effects: [...state.effects, action.payload],
      };

    case 'historian/tag/effects/change':
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

    case 'historian/tag/types/change':
      return {
        ...state,
        types: [...state.types, action.payload],
      };

    case 'historian/tag/credibility/change':
      return {
        ...state,
        credibility: [...state.credibility, action.payload],
      };

    case 'historian/tag/effects/remove':
      return {
        ...state,
        effects: state.effects.filter((effect) => effect.id !== action.payload),
      };

    case 'historian/tag/centuries/remove':
      return {
        ...state,
        centuries: state.centuries.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case 'historian/tag/credibility/remove':
      return {
        ...state,
        credibility: state.credibility.filter(
          (century) => century.id !== action.payload,
        ),
      };

    case 'historian/tag/types/remove':
      return {
        ...state,
        types: state.types.filter((type) => type.id !== action.payload),
      };

    // Изменение текста
    case 'historian/tag/title/change':
      return {
        ...state,
        name: action.payload,
      };

    //Изменение места
    case 'historian/tag/place/change':
      return {
        ...state,
        place: action.payload,
      };

    case 'historian/tag/year/change':
      return {
        ...state,
        year: action.payload,
      };

    case 'historian/tag/author/change':
      return {
        ...state,
        author: action.payload,
      };

    case 'historian/tag/comment/change':
      return {
        ...state,
        comment: action.payload,
      };

    //Добавление одного файла
    case 'historian/text/upload':
      return {
        ...state,
        name: '',
        year: '',
        author: '',
        comment: '',
        place: '',
        centuries: [],
        types: [],
        credibility: [],
        effects: [],
        materials: {
          ...state.materials,
          text: {
            ...state.materials.text,
            text: action.payload,
            name: action.name,
            year: action.year,
            place: action.place,
            author: action.author,
            comment: action.comment,
            centuries: action.centuries,
            credibility: action.credibility,
            types: action.types,
            effects: action.effects,
          },
        },
      };
    //добавление одного файла
    case 'historian/one/upload':
      if (action.format === 'image') {
        return {
          ...state,
          files: {},
          name: '',
          year: '',
          author: '',
          place: '',
          comment: '',
          centuries: [],
          types: [],
          credibility: [],
          effects: [],
          materials: {
            ...state.materials,
            photo: {
              ...state.materials.photo,
              one: [
                ...state.materials.photo.one,
                {
                  id: action.payload.id,
                  path: action.payload.path,
                  name: action.name,
                  year: action.year,
                  type: action.payload.type,
                  author: action.author,
                  place: action.place,
                  comment: action.comment,
                  centuries: action.centuries,
                  credibility: action.credibility,
                  types: action.types,
                  effects: action.effects,
                },
              ],
            },
          },
        };
      }
      if (action.format === 'application') {
        return {
          ...state,
          files: {},
          name: '',
          year: '',
          author: '',
          place: '',
          comment: '',
          centuries: [],
          types: [],
          credibility: [],
          effects: [],
          materials: {
            ...state.materials,
            document: {
              ...state.materials.document,
              one: [
                ...state.materials.document.one,
                {
                  id: action.payload.id,
                  path: action.payload.path,
                  name: action.name,
                  year: action.year,
                  type: action.payload.type,
                  author: action.author,
                  place: action.place,
                  comment: action.comment,
                  centuries: action.centuries,
                  credibility: action.credibility,
                  types: action.types,
                  effects: action.effects,
                },
              ],
            },
          },
        };
      }
      return {
        ...state,
        name: '',
        year: '',
        author: '',
        place: '',
        comment: '',
        centuries: [],
        types: [],
        credibility: [],
        effects: [],
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
                name: action.name,
                year: action.year,
                author: action.author,
                place: action.place,
                comment: action.comment,
                centuries: action.centuries,
                credibility: action.credibility,
                types: action.types,
                effects: action.effects,
              },
            ],
          },
        },
      };
    //отправка файла на сервер
    case 'historian/file/post/start':
      return {
        ...state,
        loading: true,
      };

    case 'historian/file/post/success':
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
    case 'historian/file/delete/success':
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
    case 'historian/state/tags/remove':
      return {
        ...state,
        files: {},
        name: '',
        year: '',
        author: '',
        place: '',
        comment: '',
        centuries: [],
        types: [],
        credibility: [],
        effects: [],
      };

    case 'historian/files/clear/start':
      return {
        ...state,
        files: {},
        name: '',
        year: '',
        author: '',
        place: '',
        comment: '',
        centuries: [],
        types: [],
        credibility: [],
        effects: [],
      };

    case 'historian/files/clear/success':
      if (action.payload.amount === 'one') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.payload.format]: {
              ...state.materials[action.payload.format],
              one: state.materials[action.payload.format].one.filter(
                (item) => item.id !== action.payload.file.id,
              ),
            },
          },
        };
      }

      if (action.payload.amount === 'group') {
        return {
          ...state,
          materials: {
            ...state.materials,
            [action.payload.format]: {
              ...state.materials[action.payload.format],
              group: state.materials[action.payload.format].group.filter(
                (item) => action.payload.groupId !== item.group,
              ),
            },
          },
        };
      }

      return state;

    //добавление группы файлов
    case 'historian/group/upload':
      if (action.format === 'application') {
        return {
          ...state,
          files: {},
          name: '',
          year: '',
          place: '',
          author: '',
          place: '',
          comment: '',
          centuries: [],
          types: [],
          credibility: [],
          effects: [],
          materials: {
            ...state.materials,
            document: {
              ...state.materials.document,
              group: [
                ...state.materials.document.group,
                {
                  group: action.payload.group,
                  files: action.payload.files.map((file) => {
                    return {
                      ...file,
                      name: file.name ? file.name : action.name,
                      year: file.year ? file.year : action.year,
                      author: file.author ? file.author : action.author,
                      place: file.place ? file.place : action.place,
                      comment: file.comment ? file.comment : action.comment,
                      centuries: file.centuries
                        ? file.centuries
                        : action.centuries,
                      types: file.types ? file.types : action.types,
                      credibility: file.credibility
                        ? file.credibility
                        : action.credibility,
                      effects: file.effects ? file.effects : [],
                    };
                  }),
                  name: action.name,
                  year: action.year,
                  author: action.author,
                  comment: action.comment,
                  place: action.place,
                  centuries: action.centuries,
                  types: action.types,
                  credibility: action.credibility,
                },
              ],
            },
          },
        };
      }
      if (action.format === 'image') {
        return {
          ...state,
          files: {},
          name: '',
          year: '',
          author: '',
          place: '',
          comment: '',
          centuries: [],
          types: [],
          credibility: [],
          effects: [],
          materials: {
            ...state.materials,
            photo: {
              ...state.materials.photo,
              group: [
                ...state.materials.photo.group,
                {
                  group: action.payload.group,
                  files: action.payload.files.map((file) => {
                    return {
                      ...file,
                      name: file.name ? file.name : action.name,
                      year: file.year ? file.year : action.year,
                      author: file.author ? file.author : action.author,
                      place: file.place ? file.place : action.place,
                      comment: file.comment ? file.comment : action.comment,
                      centuries: file.centuries
                        ? file.centuries
                        : action.centuries,
                      types: file.types ? file.types : action.types,
                      credibility: file.credibility
                        ? file.credibility
                        : action.credibility,
                      effects: file.effects ? file.effects : [],
                    };
                  }),
                  name: action.name,
                  year: action.year,
                  author: action.author,
                  place: action.place,
                  comment: action.comment,
                  centuries: action.centuries,
                  types: action.types,
                  credibility: action.credibility,
                },
              ],
            },
          },
        };
      }
      return {
        ...state,
        files: {},
        name: '',
        year: '',
        author: '',
        place: '',
        comment: '',
        centuries: [],
        types: [],
        credibility: [],
        effects: [],
        materials: {
          ...state.materials,
          [action.format]: {
            ...state.materials[action.format],
            group: [
              ...state.materials[action.format].group,
              {
                group: action.payload.group,
                files: action.payload.files.map((file) => {
                  return {
                    ...file,
                    name: file.name ? file.name : action.name,
                    year: file.year ? file.year : action.year,
                    author: file.author ? file.author : action.author,
                    place: file.place ? file.place : action.place,
                    comment: file.comment ? file.comment : action.comment,
                    centuries: file.centuries
                      ? file.centuries
                      : action.centuries,
                    types: file.types ? file.types : action.types,
                    credibility: file.credibility
                      ? file.credibility
                      : action.credibility,
                    effects: file.effects ? file.effects : [],
                  };
                }),
                name: action.name,
                year: action.year,
                author: action.author,
                place: action.place,
                comment: action.comment,
                centuries: action.centuries,
                types: action.types,
                credibility: action.credibility,
              },
            ],
          },
        },
      };

    case 'historian/files/post/start':
      return {
        ...state,
        loadingFiles: true,
      };

    case 'historian/files/post/success':
      return {
        ...state,
        loadingFiles: false,
        files: action.payload.message,
        progress: 0,
      };

    case 'historian/draft/load/start':
      return {
        ...state,
        loading: true,
      };

    case 'historian/draft/load/success':
      function getGroupFiles(arr) {
        const result = [];
        const object = {};

        for (let i = 0; i < arr.length; i++) {
          if (!result.includes(arr[i].group_hash)) {
            result.push(arr[i].group_hash);
          }
        }

        for (let i = 0; i < result.length; i++) {
          object[result[i]] = {
            group: '',
            files: [],
          };
        }

        for (let i = 0; i < arr.length; i++) {
          object[arr[i].group_hash].group = arr[i].group_hash;
          object[arr[i].group_hash].files.push(arr[i]);
        }
        return Object.values(object);
      }

      return {
        ...state,
        loading: false,
        materials: {
          ...state.materials,
          photo: {
            one: action.payload.message.photo.filter(
              (item) => item.group_hash === null,
            ),
            group: getGroupFiles(
              action.payload.message.photo.filter(
                (item) => item.group_hash !== null,
              ),
            ),
          },

          audio: {
            one: action.payload.message.audio.filter(
              (item) => item.group_hash === null,
            ),
            group: getGroupFiles(
              action.payload.message.audio.filter(
                (item) => item.group_hash !== null,
              ),
            ),
          },

          document: {
            one: action.payload.message.document.filter(
              (item) => item.group_hash === null,
            ),
            group: getGroupFiles(
              action.payload.message.document.filter(
                (item) => item.group_hash !== null,
              ),
            ),
          },

          video: {
            one: action.payload.message.video.filter(
              (item) => item.group_hash === null,
            ),
            group: getGroupFiles(
              action.payload.message.video.filter(
                (item) => item.group_hash !== null,
              ),
            ),
          },
        },
      };

    case 'historian/change/files/tags':
      return {
        ...state,
        name: action.payload.name ? action.payload.name : '',
        year: action.payload.year ? action.payload.year : '',
        author: action.payload.author ? action.payload.author : '',
        place: action.payload.place ? action.payload.place : '',
        comment: action.payload.comment ? action.payload.comment : '',
        centuries: action.payload.centuries ? action.payload.centuries : [],
        types: action.payload.types ? action.payload.types : [],
      };

    case CHANGE_SEND__MATERIAL:
      if (action.format === 'text') {
        return {
          ...state,
          material: {
            ...state.material,
            text: {
              ...state.material.text,
              name: action.name,
              year: action.year,
              author: action.author,
              place: action.place,
              comment: action.comment,
              text: action.localEffects.text,
              centuries: action.century,
              types: action.information,
              credibility: action.credibility,
              effects: action.localEffects.effects,
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
                  item.name = action.name;
                  item.year = action.year;
                  item.author = action.author;
                  item.place = action.place;
                  item.comment = action.comment;
                  item.centuries = action.century;
                  item.types = action.information;
                  item.effects = action.localEffects.effects;
                  item.credibility = action.credibility;
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
                  item.name = action.name;
                  item.year = action.year;
                  item.author = action.author;
                  item.place = action.place;
                  item.comment = action.comment;
                  item.centuries = action.century;
                  item.credibility = action.credibility;
                  item.files = action.localEffects.files;
                  item.types = action.information;
                }

                return item;
              }),
            },
          },
        };
      }

      return state;

    case 'historian/change/progress':
      return {
        ...state,
        progress: action.payload,
      };

    case 'historian/change/group/file':
      return {
        ...state,
        files: {
          ...state.files,
          files: state.sendMaterial.files.map((file) => {
            if (file.id === action.payload.id) {
              return {
                ...action.payload,
              };
            }
            return file;
          }),
        },
      };

    //Изменение целостности материала
    case CHANGED_IS_MATERIAL:
      return {
        ...state,
        materials: {
          ...state.materials,
          isMaterial: !state.materials.isMaterial,
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

export const addedEffects = (value) => {
  return {
    type: 'historian/tag/effects/added',
    payload: value,
  };
};

export const changedEffects = (value) => {
  return {
    type: 'historian/tag/effects/change',
    payload: value,
  };
};

export const addedTypes = (value) => {
  return {
    type: 'historian/tag/types/change',
    payload: value,
  };
};

export const addedCredibility = (value) => {
  return {
    type: 'historian/tag/credibility/change',
    payload: value,
  };
};

export const removeCenturies = (id) => {
  return {
    type: 'historian/tag/centuries/remove',
    payload: id,
  };
};

export const removeEffects = (id) => {
  return {
    type: 'historian/tag/effects/remove',
    payload: id,
  };
};

export const removeCredibility = (id) => {
  return {
    type: 'historian/tag/credibility/remove',
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
  centuries,
  types,
  effects,
  credibility,
) => {
  return {
    type: 'historian/one/upload',
    payload: file,
    format,
    name,
    year,
    author,
    place,
    comment,
    centuries,
    types,
    effects,
    credibility,
  };
};

export const UploadTextFail = (
  name,
  year,
  author,
  place,
  comment,
  centuries,
  types,
  file,
  effects,
  credibility,
) => {
  return {
    type: 'historian/text/upload',
    payload: file,
    name,
    year,
    author,
    place,
    comment,
    centuries,
    types,
    effects,
    credibility,
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
  effects,
  credibility,
) => {
  return {
    type: 'historian/group/upload',
    payload: file,
    format,
    name,
    year,
    author,
    place,
    comment,
    centuries,
    types,
    effects,
    credibility,
  };
};

export const RemoveStateTags = () => {
  return {
    type: 'historian/state/tags/remove',
  };
};

export const deleteOneFail = (id, format, amount, groupId) => {
  return (dispatch) => {
    dispatch({
      type: 'historian/file/delete/start',
      payload: id,
      format,
      amount,
      groupId,
    });

    api
      .delete(`/draft/file/delete/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/file/delete/success',
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

export const clearFiles = (files, info) => {
  if (!files.files) {
    return (dispatch) => {
      dispatch({
        type: 'historian/files/clear/start',
        files,
      });

      api
        .delete(`/draft/file/delete/${files.id}`, {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'historian/files/clear/success',
            payload: info,
            message: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };
  }

  return (dispatch) => {
    dispatch({
      type: 'historian/files/clear/start',
      files,
    });

    files.files.forEach((item) => {
      api
        .delete(`/draft/file/delete/${item.id}`, {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: 'historian/files/clear/success',
            payload: info,
            message: data,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };
};

export const postFail = (file, format) => {
  const form = new FormData();
  form.append('file', file);
  form.append('type', format);

  return (dispatch) => {
    dispatch({ type: 'historian/files/post/start', file, format });

    api
      .post('/draft/file/send', form, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
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
              type: 'historian/change/progress',
              payload: progress,
            });
          }
        },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/files/post/success',
          payload: data,
          format,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const postFilesGroup = (files, format, causes) => {
  const form = new FormData();
  form.append('type', format);
  for (let i = 0; i < files.length; i++) {
    form.append(`files[${i}]`, files[i]);
  }

  for (let i = 0; i < causes.length; i++) {
    form.append(`causes[${i}]`, causes[i]);
  }

  return (dispatch) => {
    dispatch({ type: 'historian/files/post/start', files, format, causes });

    api
      .post('/draft/group/files/send', form, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
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
              type: 'historian/change/progress',
              payload: progress,
            });
          }
        },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/files/post/success',
          payload: data,
          format,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

export const getDraftFiles = () => {
  return (dispatch) => {
    dispatch({
      type: 'historian/draft/load/start',
    });

    api
      .get('/draft/files/all', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: 'historian/draft/load/success',
          payload: data,
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

export const postMaterial = (title, text, photo, document, video, audio) => {
  return (dispatch) => {
    dispatch({ type: 'historian/material/post/start' });

    api
      .post(
        '/user/add/material/send',
        { title, text, photo, document, audio, video },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
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
  };
};

//Изменения файла в группе файлов

export const changeGroupFile = (file) => {
  return {
    type: 'historian/change/group/file',
    payload: file,
  };
};

export const ChangeSendMaterials = (
  id,
  format,
  amount,
  group,
  name,
  year,
  author,
  place,
  comment,
  information,
  century,
  credibility,
  localEffects,
) => {
  return {
    type: CHANGE_SEND__MATERIAL,
    id,
    format,
    amount,
    group,
    name,
    year,
    author,
    place,
    comment,
    information,
    century,
    credibility,
    localEffects,
  };
};

export const changedIsMaterialHistorian = () => {
  return {
    type: CHANGED_IS_MATERIAL,
  };
};
