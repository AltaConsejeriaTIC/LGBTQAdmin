// actions
export const SESSION_LOGIN = 'session/LOGIN';
export const SESSION_LOGOUT = 'session/LOGOUT';
export const EVENT_GET_EVENTS = 'event/GET_EVENTS';
export const EVENT_UPDATE = 'event/UPDATE_EVENT';
export const EVENT_CHANGE_STATE = 'event/CHANGE_STATE';
export const EVENT_CREATE_EVENT = 'event/CREATE_EVENT';
export const EVENT_CALL_BY_ID = 'event/GET_EVENT_BY_ID';
export const NEWS_GET_NEWS = 'news/GET_NEWS';
export const NEWS_UPDATE = 'news/UPDATE_NEWS';
export const NEWS_CHANGE_STATE = 'news/CHANGE_STATE';
export const NEWS_CREATE_NEWS = 'news/CREATE_NEWS';
export const NEWS_CALL_BY_ID = 'news/GET_NEWS_BY_ID';
export const HIGHLIGHT_GET_HIGHLIGHT = 'highlight/GET_HIGHLIGHT';
export const HIGHLIGHT_CREATE_HIGHLIGHT = 'highlight/CREATE_HIGHLIGHT';
export const HIGHLIGHT_DELETE_HIGHLIGHT = 'highlight/DELETE_HIGHLIGHT';
export const ORGANIZATION_GET_ORGANIZATIONS = 'organization/GET_ORGANIZATION';
export const ORGANIZATION_UPDATE = 'organization/UPDATE_ORGANIZATION';
export const ORGANIZATION_CHANGE_STATE = 'organization/CHANGE_STATE';
export const ORGANIZATION_CREATE_ORGANIZATION = 'organization/CREATE_ORGANIZATION';
export const ORGANIZATION_CALL_BY_ID = 'organization/GET_ORGANIZATION_BY_ID';
export const ORGANIZATION_DELETE = 'organization/DELETE_ORGANIZATION';
export const ALLIANCE_GET_ALLIANCES = 'alliance/GET_ALLIANCES';
export const ALLIANCE_UPDATE = 'alliance/UPDATE_ALLIANCE';
export const ALLIANCE_CHANGE_STATE = 'alliance/CHANGE_STATE';
export const ALLIANCE_CREATE_ALLIANCE = 'alliance/CREATE_ALLIANCE';
export const ALLIANCE_CALL_BY_ID = 'alliance/GET_ALLIANCE_BY_ID';
export const PERSONALDATA_GET_USERS = 'personalData/GET_USERS';
export const COMPLAINT_GET_COMPLAINTS = 'complaint/GET_COMPLAINTS';
export const COMPLAINT_CALL_BY_ID = 'complaint/GET_COMPLAINT_BY_ID';
export const EVENT_GET_ON_EVENTS = 'event/GET_ON_EVENTS';
export const NEWS_GET_ON_NEWS = 'news/NEWS_GET_ON_NEWS';

export const NOTIFICATION_SEND = 'notification/SEND';

//mutations
export const SESSION_SET_TOKEN = 'session/SET_TOKEN';
export const SESSION_SET_ALERT = 'session/SET_ALERT';
export const EVENT_SET_EVENTS = 'event/SET_EVENTS';
export const HIGHLIGHT_SET_HIGHLIGHTS = 'highlight/SET_HIGHLIGHTS';
export const EVENT_SET_EVENT = 'event/SET_EVENT';
export const EVENT_ADD_EVENT = 'event/ADD_EVENT';
export const NEWS_SET_NEWS = 'news/SET_NEWS';
export const NEWS_SET_ONE_NEWS = 'news/SET_ONE_NEWS';
export const NEWS_ADD_NEWS = 'news/ADD_NEWS';
export const HIGHLIGHT_ADD_HIGHLIGHT = 'highlight/ADD_HIGHLIGHT';
export const HIGHLIGHT_UPDATE_DELETE_HIGHLIGHT = 'highlight/UPDATE_DELETE_HIGHLIGHT';
export const ORGANIZATION_SET_ORGANIZATIONS = 'organization/SET_ORGANIZATIONS';
export const ORGANIZATION_SET_ORGANIZATION = 'organization/SET_ORGANIZATION';
export const ORGANIZATION_ADD_ORGANIZATION = 'organization/ADD_ORGANIZATION';
export const ORGANIZATION_DELETE_ORGANIZATION = 'organization/DELETE_ORGANIZATION';
export const ALLIANCE_SET_ALLIANCES = 'alliance/SET_ALLIANCES';
export const ALLIANCE_SET_ALLIANCE = 'alliance/SET_ALLIANCE';
export const ALLIANCE_ADD_ALLIANCE = 'alliance/ADD_ALLIANCE';
export const PERSONALDATA_SET_USERS = 'personalData/SET_DATA';
export const COMPLAINT_SET_COMPLAINTS = 'complaint/SET_COMPLAINTS';
export const EVENT_SET_CURRENT_EVENTS = 'events/SET_CURRENT_EVENTS';
export const NEWS_SET_CURRENT_NEWS = 'news/NEWS_SET_CURRENT_NEWS';

//getters
export const SESSION_IS_LOGGED = 'session/IS_LOGGED';
export const SESSION_INVALID_LOGIN = 'session/INVALID_LOGIN';
export const EVENTS = 'events/GET';
export const EVENT_BY_ID = 'event/GET_EVENT';
export const NEWS = 'news/GET';
export const HIGHLIGHTS = 'highlights/GET';
export const NEWS_BY_ID = 'news/GET_EVENT';
export const ORGANIZATIONS = 'organization/GET';
export const ORGANIZATION_BY_ID = 'organization/GET_ORGANIZATION';
export const ALLIANCES = 'alliance/GET';
export const ALLIANCE_BY_ID = 'alliance/GET_ALLIANCE';
export const USERS = 'personalData/GET';
export const PERSONALDATA_BY_ID = 'personalData/GET_USER';
export const COMPLAINTS = 'complaint/GET';
export const COMPLAINT_BY_ID = 'complaint/GET_COMPLAINT'
export const CURRENT_EVENTS = 'events/CURRENT_EVENTS';
export const CURRENT_NEWS = 'news/CURRENT_NEWS';

//error messages
import { helpers } from 'vuelidate/lib/validators'
import moment from 'moment';

export const ERROR_MESSAGES = (e) => {
  switch (e.type) {
    case "maxLength": return `Este campo puede tener hasta ${e.max} caracteres.`;
    case "minLength": return `Este campo puede tener minimo ${e.min} caracteres.`;
    case "required": return "Este campo es requerido.";
    case "addMsg":
    case "notBefore": return e.msg;
    case "email": return "El correo ingresado no es válido.";
    case "email": return "Le URL no es válida.";
    case "validatePhone": return "El teléfono ingresado no es válido."
  }
};

export const notBefore = function (d,format,msg){
  return helpers.withParams({
      type: "notBefore",
      msg: msg
    },
    (v,vm) => {
      return v >= parseDate(d, vm, format).format(format)
    }
  );
};

export const equalDates = function (p1,p2,format) {
  return (v, vm) => parseDate(p1,vm,format).format(format) === parseDate(p2,vm,format).format(format);
}

export const addMsg = function (f,msg){
  return helpers.withParams({
      type: "addMsg",
      msg: msg
    },
    (v,vm) => {
      return f.call(this, v, vm)
    }
  );
};

const parseDate = (date,vm,format) => moment(date,format).isValid() ? moment(date,format) : moment(vm[date],format);

export const validatePhone = helpers.withParams(
  {type: "validatePhone"},
  (v) => /^([0-9().+ext ]){7,40}$/.test(v)
);


