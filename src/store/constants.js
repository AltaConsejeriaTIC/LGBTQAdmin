// actions
export const SESSION_LOGIN = 'session/LOGIN';
export const SESSION_LOGOUT = 'session/LOGOUT';
export const EVENT_GET_EVENTS = 'event/GET_EVENTS';
export const EVENT_UPDATE = 'event/UPDATE_EVENT';
export const EVENT_CHANGE_STATE = 'event/CHANGE_STATE';
export const EVENT_CREATE_EVENT = 'event/CREATE_EVENT';
export const NEWS_GET_NEWS = 'news/GET_NEWS';
export const NEWS_UPDATE = 'news/UPDATE_NEWS';
export const NEWS_CHANGE_STATE = 'news/CHANGE_STATE';
export const NEWS_CREATE_NEWS = 'news/CREATE_NEWS';
export const HIGHLIGHT_GET_HIGHLIGHT = 'highlight/GET_HIGHLIGHT';
export const HIGHLIGHT_CREATE_HIGHLIGHT = 'highlight/CREATE_HIGHLIGHT';
export const HIGHLIGHT_DELETE_HIGHLIGHT = 'highlight/DELETE_HIGHLIGHT';
export const ORGANIZATION_GET_ORGANIZATIONS = 'organization/GET_ORGANIZATION';
export const ORGANIZATION_UPDATE = 'organization/UPDATE_ORGANIZATION';
export const ORGANIZATION_CHANGE_STATE = 'organization/CHANGE_STATE';
export const ORGANIZATION_CREATE_ORGANIZATION = 'organization/CREATE_ORGANIZATION';
export const ALLIANCE_GET_ALLIANCES = 'alliance/GET_ALLIANCES';
export const ALLIANCE_UPDATE = 'alliance/UPDATE_ALLIANCE';
export const ALLIANCE_CHANGE_STATE = 'alliance/CHANGE_STATE';
export const ALLIANCE_CREATE_ALLIANCE = 'alliance/CREATE_ALLIANCE';
export const PERSONALDATA_GET_USERS = 'personalData/GET_USERS';
export const COMPLAINT_GET_COMPLAINTS = 'complaint/GET_COMPLAINTS'

//mutations
export const SESSION_SET_TOKEN = 'session/SET_TOKEN';
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
export const ALLIANCE_SET_ALLIANCES = 'alliance/SET_ALLIANCES';
export const ALLIANCE_SET_ALLIANCE = 'alliance/SET_ALLIANCE';
export const ALLIANCE_ADD_ALLIANCE = 'alliance/ADD_ALLIANCE';
export const PERSONALDATA_SET_USERS = 'personalData/SET_DATA';
export const COMPLAINT_SET_COMPLAINTS = 'complaint/SET_COMPLAINTS';

//getters
export const SESSION_IS_LOGGED = 'session/IS_LOGGED';
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
