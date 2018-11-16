import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  news: []
};

const actions = {
  [constants.NEWS_GET_NEWS]: ({ commit }) => {
    Vue.axios
      .get(`/news`)
      .then((response) => response.data)
      .then((news) => commit(constants.NEWS_SET_NEWS, news))
      .catch((e) => console.log(e));
  },
  [constants.NEWS_UPDATE]: ({commit}, news) => {
    Vue.axios
      .put(`/news/${news.id}`, news)
      .then(response => commit(constants.NEWS_SET_ONE_NEW, news))
      .catch((e) => console.log(e));
  },
  [constants.NEWS_CHANGE_STATE]: ({commit}, news) => {
    news.state = !news.state;
    Vue.axios
      .put(`/news/${news.id}`, news)
      .then(response => commit(constants.NEWS_SET_ONE_NEW, news))
      .catch((e) => console.log(e));
  }
};

const mutations = {
  [constants.NEWS_SET_NEWS]: (state, news) => {
    state.news = news;
  },
  [constants.NEWS_SET_ONE_NEW]: (state, news) => {
    for (var i = 0; i < state.news.length; i++) {
      if (state.news[i].id === news.id){
        state.news[i] = news
      }
    }
  }
};

const getters = {
  [constants.NEWS]: (state) => {
    return state.news;
  },
  [constants.NEWS_BY_ID]: (state) => (id) => {
    return state.news.find(news => news.id === id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
