// actions
export const SESSION_LOGIN = 'session/LOGIN';
export const EVENT_GET_EVENTS = 'event/GET_EVENTS';
export const EVENT_UPDATE = 'event/UPDATE_EVENT';
export const EVENT_CHANGE_STATE = 'event/CHANGE_STATE';
export const EVENT_CREATE_EVENT = 'event/CREATE_EVENT';
export const NEWS_GET_NEWS = 'news/GET_NEWS';
export const NEWS_UPDATE = 'news/UPDATE_NEWS';
export const NEWS_CHANGE_STATE = 'news/CHANGE_STATE';
export const NEWS_CREATE_NEWS = 'news/CREATE_NEWS';
export const ALLIANCE_GET_ALLIANCES = 'alliance/GET_ALLIANCES';
export const ALLIANCE_UPDATE = 'alliance/UPDATE_ALLIANCE';
export const ALLIANCE_CHANGE_STATE = 'alliance/CHANGE_STATE';
export const ALLIANCE_CREATE_ALLIANCE = 'alliance/CREATE_ALLIANCE';
export const PERSONALDATA_GET_USERS = 'personalData/GET_USERS';

//mutations
export const SESSION_SET_TOKEN = 'session/SET_TOKEN';
export const EVENT_SET_EVENTS = 'event/SET_EVENTS';
export const EVENT_SET_EVENT = 'event/SET_EVENT';
export const EVENT_ADD_EVENT = 'event/ADD_EVENT';
export const NEWS_SET_NEWS = 'news/SET_NEWS';
export const NEWS_SET_ONE_NEWS = 'news/SET_ONE_NEWS';
export const NEWS_ADD_NEWS = 'news/ADD_NEWS';
export const ALLIANCE_SET_ALLIANCES = 'alliance/SET_ALLIANCES';
export const ALLIANCE_SET_ALLIANCE = 'alliance/SET_ALLIANCE';
export const ALLIANCE_ADD_ALLIANCE = 'alliance/ADD_ALLIANCE';
export const PERSONALDATA_SET_USERS = 'personalData/SET_DATA';

//getters
export const SESSION_IS_LOGGED = 'session/IS_LOGGED';
export const EVENTS = 'events/GET';
export const EVENT_BY_ID = 'event/GET_EVENT';
export const NEWS = 'news/GET';
export const NEWS_BY_ID = 'news/GET_EVENT';
export const ALLIANCES = 'alliance/GET';
export const ALLIANCE_BY_ID = 'alliance/GET_ALLIANCE';
export const USERS = 'personalData/GET';
export const PERSONALDATA_BY_ID = 'personalData/GET_USER';