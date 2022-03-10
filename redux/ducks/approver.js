import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NEW_MATERIALS_LOAD_START = 'new/approver/load/start ';
const NEW_MATERIALS_LOAD_SUCCESS = 'new/approver/load/success';

const PROCESSED_MATERIALS_LOAD_START = 'processed/approver/load/start ';
const PROCESSED_MATERIALS_LOAD_SUCCESS = 'processed/approver/load/success';

const BLOCKED_MATERIALS_LOAD_START = 'blocked/approver/load/start ';
const BLOCKED_MATERIALS_LOAD_SUCCESS = 'blocked/approver/load/success';

const NEW_MATERIAL_LOAD_START = 'show/new/approver/load/start ';
const NEW_MATERIAL_LOAD_SUCCESS = 'show/new/approver/load/success';

const PROCESS_MATERIAL_LOAD_START = 'show/process/approver/load/start ';
const PROCESS_MATERIAL_LOAD_SUCCESS = 'show/process/approver/load/success';

const PROCESSED_MATERIAL_LOAD_START = 'show/processed/approver/load/start ';
const PROCESSED_MATERIAL_LOAD_SUCCESS = 'show/processed/approver/load/success';

const PROCESS_MATERIALS_LOAD_START = 'process/approver/load/start ';
const PROCESS_MATERIALS_LOAD_SUCCESS = 'process/approver/load/success';

const ADD_PROCESS_LOAD_START = 'approver/process/add/load/start';
const ADD_PROCESS_LOAD_SUCCESS = 'approver/process/add/load/success';

const DELETE_PROCESS_LOAD_START = 'approver/process/delete/load/start';
const DELETE_PROCESS_LOAD_SUCCESS = 'approver/process/delete/load/success';

const SEND_PROCESS_LOAD_START = 'approver/process/send/load/start';
const SEND_PROCESS_LOAD_SUCCESS = 'approver/process/send/load/success';

const PROCESS__MATERIAL = 'approver/process/material';

const DELETE_FILE = 'approver/delete/file';

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

    default:
      return state;
  }
}

//Получение новых материалов
export const getNewMaterialsApprover = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/approve/list/new', {
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
export const getProcessMaterialsApprover = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESS_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/approve/list/processing', {
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
export const getProcessedMaterialsApprover = () => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_MATERIALS_LOAD_START,
    });

    api
      .get('/cabinet/approve/list/processed', {
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
export const showNewMaterialApprover = (id) => {
  return (dispatch) => {
    dispatch({
      type: NEW_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/approve/new/${id}`, {
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
export const showProcessMaterialApprover = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESS_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/approve/process/${id}`, {
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
export const showProcessedMaterialApprover = (id) => {
  return (dispatch) => {
    dispatch({
      type: PROCESSED_MATERIAL_LOAD_START,
    });

    api
      .get(`/cabinet/approve/processed/${id}`, {
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

export const addMaterialInProcessApprover = (id) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PROCESS_LOAD_START,
      id,
    });

    api
      .post(
        `/cabinet/approve/process/add`,
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

export const deleteMaterialOfProcessApprover = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PROCESS_LOAD_START,
      id,
    });

    api
      .post(
        `/cabinet/approve/process/reject`,
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

//Отправка материала

export const SendMaterialOfProcessApprover = (material) => {
  return (dispatch) => {
    dispatch({
      type: SEND_PROCESS_LOAD_START,
      material,
    });

    api
      .patch(
        `/cabinet/approve/process/send`,
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
