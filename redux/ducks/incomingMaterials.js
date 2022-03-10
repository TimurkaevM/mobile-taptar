import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NEW_MATERIALS_LOAD_START = 'new/materials/load/start ';
const NEW_MATERIALS_LOAD_SUCCESS = 'new/materials/load/success';

const PROCESSED_MATERIALS_LOAD_START = 'processed/materials/load/start ';
const PROCESSED_MATERIALS_LOAD_SUCCESS = 'processed/materials/load/success';

const BLOCKED_MATERIALS_LOAD_START = 'blocked/materials/load/start ';
const BLOCKED_MATERIALS_LOAD_SUCCESS = 'blocked/materials/load/success';

const NEW_MATERIAL_LOAD_START = 'show/new/material/load/start ';
const NEW_MATERIAL_LOAD_SUCCESS = 'show/new/material/load/success';

const PROCESS_MATERIAL_LOAD_START = 'show/process/material/load/start ';
const PROCESS_MATERIAL_LOAD_SUCCESS = 'show/process/material/load/success';

const PROCESSED_MATERIAL_LOAD_START = 'show/processed/material/load/start ';
const PROCESSED_MATERIAL_LOAD_SUCCESS = 'show/processed/material/load/success';

const PROCESS_MATERIALS_LOAD_START = 'process/materials/load/start ';
const PROCESS_MATERIALS_LOAD_SUCCESS = 'process/materials/load/success';

const ADD_PROCESS_LOAD_START = 'process/add/load/start';
const ADD_PROCESS_LOAD_SUCCESS = 'process/add/load/success';

const DELETE_PROCESS_LOAD_START = 'process/delete/load/start';
const DELETE_PROCESS_LOAD_SUCCESS = 'process/delete/load/success';

const SEND_PROCESS_LOAD_START = 'process/send/load/start';
const SEND_PROCESS_LOAD_SUCCESS = 'process/send/load/success';

const PROCESS__MATERIAL = 'process/material';

const DELETE_FILE = 'delete/file';

const CHANGED_IS_MATERIAL = 'changed/isMaterial';

const CHANGED_INCOMING_TITLE = 'change/incomingMaterial/title';

const initialState = {
  message: '',
  materials: [],
  material: {
    id: '',
    isMaterial: null,
    process_id: null,
    process_status: null,
    title: '',
    user_id: null,
    processed: null,
    group_hash: null,
    files: {
      text: [],

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
  },
  file: null,
  loading: true,
};

export default function incomingMaterials(state = initialState, action) {
  switch (action.type) {
    // Получение новых материалов
    case NEW_MATERIALS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case NEW_MATERIALS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: action.payload.message,
      };
    // Получение обработанного материалов
    case PROCESSED_MATERIALS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESSED_MATERIALS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: action.payload.message,
      };

    // Получение отклоненного материалов
    case BLOCKED_MATERIALS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case BLOCKED_MATERIALS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: action.payload.message,
      };

    // Получение обрабатываемых материалов
    case PROCESS_MATERIALS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESS_MATERIALS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        materials: action.payload.message,
      };

    // Получение нового материала
    case NEW_MATERIAL_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case NEW_MATERIAL_LOAD_SUCCESS:
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
            group_hash: '',
            files: [],
            tags_century: [],
            tags_credibility: [],
            tags_information: [],
          };
        }

        for (let i = 0; i < arr.length; i++) {
          object[arr[i].group_hash].group_hash = arr[i].group_hash;
          object[arr[i].group_hash].tags_century = arr[i].tags_century;
          object[arr[i].group_hash].title = arr[i].title;
          object[arr[i].group_hash].author = arr[i].author;
          object[arr[i].group_hash].tags_information = arr[i].tags_information;
          object[arr[i].group_hash].comment = arr[i].comment;
          object[arr[i].group_hash].year = arr[i].year;
          object[arr[i].group_hash].processed = arr[i].processed;
          object[arr[i].group_hash].delete = arr[i].delete;
          object[arr[i].group_hash].deleted = arr[i].deleted;
          object[arr[i].group_hash].files.push(arr[i]);
        }
        return Object.values(object);
      }

      return {
        ...state,
        loading: false,
        material: {
          id: action.payload.message.id,
          isMaterial: action.payload.message.is_material,
          process_id: action.payload.message.process_id,
          process_status: action.payload.message.process_status,
          title: action.payload.message.title,
          user_id: action.payload.message.user_id,
          files: {
            text: action.payload.message.files.text[0],

            photo: {
              one: action.payload.message.files.photo.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.photo.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            audio: {
              one: action.payload.message.files.audio.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.audio.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            document: {
              one: action.payload.message.files.document.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.document.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            video: {
              one: action.payload.message.files.video.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.video.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },
          },
        },
      };

    //Получение обрабатываемого материала
    case PROCESS_MATERIAL_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESS_MATERIAL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        material: {
          id: action.payload.message.id,
          isMaterial: action.payload.message.is_material,
          process_id: action.payload.message.process_id,
          process_status: action.payload.message.process_status,
          title: action.payload.message.title,
          user_id: action.payload.message.user_id,
          files: {
            text: action.payload.message.files.text[0],

            photo: {
              one: action.payload.message.files.photo.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.photo.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            audio: {
              one: action.payload.message.files.audio.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.audio.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            document: {
              one: action.payload.message.files.document.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.document.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            video: {
              one: action.payload.message.files.video.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.video.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },
          },
        },
      };

    //Получение обработаного материала
    case PROCESSED_MATERIAL_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case PROCESSED_MATERIAL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        material: {
          id: action.payload.message.id,
          isMaterial: action.payload.message.is_material,
          process_id: action.payload.message.process_id,
          process_status: action.payload.message.process_status,
          title: action.payload.message.title,
          user_id: action.payload.message.user_id,
          files: {
            text: action.payload.message.files.text[0],

            photo: {
              one: action.payload.message.files.photo.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.photo.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            audio: {
              one: action.payload.message.files.audio.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.audio.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            document: {
              one: action.payload.message.files.document.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.document.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },

            video: {
              one: action.payload.message.files.video.filter(
                (item) => item.group_hash === null,
              ),
              group: getGroupFiles(
                action.payload.message.files.video.filter(
                  (item) => item.group_hash !== null,
                ),
              ),
            },
          },
        },
      };

    //Title Material
    case CHANGED_INCOMING_TITLE:
      return {
        ...state,
        material: {
          ...state.material,
          title: action.payload,
        },
      };

    // добавление материала в обрабатываемые
    case ADD_PROCESS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case ADD_PROCESS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        material: {
          ...state.material,
          process_status: 1,
        },
      };

    // Удаление материала из обрабатываемые
    case DELETE_PROCESS_LOAD_START:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PROCESS_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        material: {
          ...state.material,
          process_status: 0,
        },
      };

    //Обработка материала
    case PROCESS__MATERIAL:
      if (action.format === 'text') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              text: {
                ...state.material.files.text,
                title: action.name,
                year: action.year,
                author: action.author,
                comment: action.comment,
                text: action.localEffects.text,
                tags_century: action.century,
                tags_information: action.information,
                tags_credibility: action.credibility,
                effects: action.localEffects.effects,
                processed: true,
              },
            },
          },
        };
      }

      if (action.amount === 'one') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              [action.format]: {
                ...state.material.files[action.format],
                one: state.material.files[action.format].one.map((item) => {
                  if (item.id === action.id) {
                    item.title = action.name;
                    item.year = action.year;
                    item.author = action.author;
                    item.comment = action.comment;
                    item.tags_century = action.century;
                    item.tags_information = action.information;
                    item.tags_credibility = action.credibility;
                    item.effects = action.localEffects.effects;
                    item.processed = true;
                  }

                  return item;
                }),
              },
            },
          },
        };
      }

      if (action.amount === 'group') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              [action.format]: {
                ...state.material.files[action.format],
                group: state.material.files[action.format].group.map((item) => {
                  if (item.id === action.id) {
                    item.title = action.name;
                    item.year = action.year;
                    item.author = action.author;
                    item.comment = action.comment;
                    item.tags_century = action.century;
                    item.tags_information = action.information;
                    item.tags_credibility = action.credibility;
                    item.files = action.localEffects.files;
                    item.processed = true;
                  }

                  return item;
                }),
              },
            },
          },
        };
      }

      return state;

    //Удаление файла
    case DELETE_FILE:
      if (action.format === 'text') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              text: {
                ...state.material.files.text,
                delete: action.deleteState,
              },
            },
          },
        };
      }

      if (action.amount === 'one') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              [action.format]: {
                ...state.material.files[action.format],
                one: state.material.files[action.format].one.map((item) => {
                  if (item.id === action.id) {
                    item.delete = action.deleteState;
                  }

                  return item;
                }),
              },
            },
          },
        };
      }

      if (action.amount === 'group') {
        return {
          ...state,
          material: {
            ...state.material,
            files: {
              ...state.material.files,
              [action.format]: {
                ...state.material.files[action.format],
                group: state.material.files[action.format].group.map((item) => {
                  if (item.group_hash === action.id) {
                    item.delete = action.deleteState;
                  }

                  return item;
                }),
              },
            },
          },
        };
      }

      return state;

    //Изменение целостности материала
    case CHANGED_IS_MATERIAL:
      return {
        ...state,
        material: {
          ...state.material,
          isMaterial: !state.material.isMaterial,
        },
      };

    default:
      return state;
  }
}

//Получение новых материалов
export const getNewMaterials = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/material/list/new', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: NEW_MATERIALS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
//Получение обрабатываемого материалов
export const getProcessMaterials = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESS_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/material/list/processing', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESS_MATERIALS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Получение Обработанных материалов
export const getProcessedMaterials = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/material/list/processed', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_MATERIALS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
//Получение отклоненных материалов
export const getBlockedMaterials = () => {
  return (dispatch) => {
    dispatch({
      type: BLOCKED_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/material/list/blocked', {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: BLOCKED_MATERIALS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Просмотр нового материала
export const showNewMaterial = (id) => {
  return (dispatch) => {
    dispatch({
      type: NEW_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/material/new/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: NEW_MATERIAL_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Просмотр обрабатываемого материала
export const showProcessMaterial = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESS_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/material/process/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESS_MATERIAL_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Просмотр обрабатываемого материала
export const showProcessedMaterial = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/material/processed/${id}`, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: PROCESSED_MATERIAL_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Добавление материала в обрабатываемые

export const addMaterialInProcess = (id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PROCESS_LOAD_START,
      id,
    });

    api
      .post(
        `/cabinet/material/process/add/`,
        { id },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: ADD_PROCESS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

// Добавление материала в новые

export const deleteMaterialOfProcess = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PROCESS_LOAD_START,
      id,
    });

    api
      .post(
        `/cabinet/material/process/reject/`,
        { process_id: id },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: DELETE_PROCESS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};

//Обработка материала
export const ChangeIncomingMaterials = (
  id,
  format,
  amount,
  group,
  name,
  year,
  author,
  comment,
  information,
  century,
  credibility,
  localEffects,
) => {
  return {
    type: PROCESS__MATERIAL,
    id,
    format,
    amount,
    group,
    name,
    year,
    author,
    comment,
    information,
    century,
    credibility,
    localEffects,
  };
};

//Удаление фа1ла
export const changeDeleteMaterial = (id, deleteState, format, amount) => {
  return {
    type: DELETE_FILE,
    id,
    deleteState,
    format,
    amount,
  };
};

export const changedIsMaterial = () => {
  return {
    type: CHANGED_IS_MATERIAL,
  };
};

export const changedIncomingMaterialTitle = (text) => {
  return {
    type: CHANGED_INCOMING_TITLE,
    payload: text,
  };
};

//Отправка материала

export const SendMaterialOfProcess = (material) => {
  return (dispatch) => {
    dispatch({
      type: SEND_PROCESS_LOAD_START,
      material,
    });

    api
      .patch(
        `/cabinet/material/process/send`,
        {
          id: material.process_id,
          title: material.title,
          is_material: material.isMaterial,
          files: material.files,
        },
        {
          headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
        },
      )
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: SEND_PROCESS_LOAD_SUCCESS,
          payload: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
};
