export const CHANGED_IS_MATERIAL = 'changed/isMaterial/historian';
export const CHANGE_MATERIAL_BOOKMARK = 'historian/bookmark/material/change';
export const CHANGE_TITLE = 'historian/title/change';
export const CHANGE_TEXT = 'historian/text/change';
export const TEXT_DELETE_START = 'historian/text/delete/start';
export const TEXT_DELETE_SUCCESS = 'historian/text/delete/success';
export const TEXT_CLEAR = 'historian/text/clear/success';
export const REMOVE_FILE_START = 'historian/file/remove/start';
export const REMOVE_FILE_SUCCESS = 'historian/file/remove/success';
export const ONE_UPLOAD_START = 'historian/one/upload/start';
export const ONE_UPLOAD_SUCCESS = 'historian/one/upload/success';
export const TEXT_UPLOAD_START = 'historian/text/upload/start';
export const TEXT_UPLOAD_SUCCESS = 'historian/text/upload/success';
export const ONE_CHANGE_START = 'historian/one/change/start';
export const ONE_CHANGE_SUCCESS = 'historian/one/change/success';
export const TEXT_CHANGE_START = 'historian/text/change/start';
export const TEXT_CHANGE_SUCCESS = 'historian/text/change/success';
export const DRAFT_GET_START = 'historian/draft/load/start';
export const DRAFT_GET_SUCCESS = 'historian/draft/load/success';
export const DRAFT_GET_ERROR = 'historian/draft/load/error';
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
    case CHANGE_MATERIAL_BOOKMARK:
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
          [action.format]: [
            ...state.materials[action.format],
            {
              processed: true,
              id: action.payload.id,
              path: action.payload.path,
              type: action.format,
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

    case REMOVE_FILE_SUCCESS:
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

    // изменение принадлежностей файлов
    case TEXT_CHANGE_SUCCESS:
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
            text: action.text.text,
            tags_century: action.centuryClient,
            tags_information: action.informationClient,
            tags_credibility: action.credibilityClient,
            effects: action.effects,
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
              return {
                ...item,
                processed: true,
                type: action.format,
                title: action.title,
                year: action.year,
                author: action.author,
                location: action.location,
                comment: action.comment,
                tags_century: action.centuryClient,
                tags_information: action.informationClient,
                effects: action.effects,
                tags_credibility: action.credibilityClient,
                bookmark: action.bookmark,
                albums: action.albums,
              };
              item.processed = true;
              item.type = action.format;
              item.title = action.title;
              item.year = action.year;
              item.author = action.author;
              item.location = action.location;
              item.comment = action.comment;
              item.tags_century = action.centuryClient;
              item.tags_information = action.informationClient;
              item.effects = action.effects;
              item.tags_credibility = action.credibilityClient;
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
