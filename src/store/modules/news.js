import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  news: []
};

const actions = {
  [constants.NEWS_GET_NEWS]: ({ commit }) => {
    return Vue.axios
      .get(`/allnews`)
      .then((response) => response.data)
      .then((news) => commit(constants.NEWS_SET_NEWS, news))
      .catch((e) => console.error(e));
  },
  [constants.NEWS_UPDATE]: ({commit}, news) => {
    return new Promise((resolve, reject) => {
      Vue.axios
        .put(`/news/${news.id}`, news, { headers: { token: sessionStorage.getItem('token') }})
        .then( () =>{
          commit(constants.NEWS_SET_ONE_NEWS, news);
          resolve();
        })
        .catch( e => {
          console.error(e);
          reject();
        });
    })    
  },
  [constants.NEWS_CHANGE_STATE]: ({commit}, news) => {
    news.state = !news.state;
    return Vue.axios
      .put(`/updateNewsState/${news.id}`, news, { headers: { token: sessionStorage.getItem('token') }})
      .then(response => commit(constants.NEWS_SET_ONE_NEWS, news))
      .catch((e) => console.log(e));
  },
  [constants.NEWS_CREATE_NEWS]: ({commit}, news) => {
    return new Promise( (resolve, reject) => {
      Vue.axios
      .post('/news', news, { headers: { token: sessionStorage.getItem('token') }})
      .then(response => {
        news.id = response.data.id;        
        commit(constants.NEWS_ADD_NEWS, news);
        resolve();
      })
      .catch((e) => {
        console.error(e);
        reject();
      });
    })    
  }
};

const mutations = {
  [constants.NEWS_SET_NEWS]: (state, news) => {
    state.news = news;
  },
  [constants.NEWS_SET_ONE_NEWS]: (state, news) => {
    for (var i = 0; i < state.news.length; i++) {
      if (state.news[i].id === news.id){
        state.news[i] = news
      }
    }
  },
  [constants.NEWS_ADD_NEWS]: (state, news) => {
    state.news.push(news);
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
