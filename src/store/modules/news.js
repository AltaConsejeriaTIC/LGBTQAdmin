import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
    news: [],
    currentNews: []
};

const actions = {
    [constants.NEWS_GET_NEWS]: ({ commit }) => {
        return Vue.axios
            .get(`/allnews`)
            .then((response) => response.data)
            .then((news) => commit(constants.NEWS_SET_NEWS, news))
            .catch((e) => console.error(e));
    },
    [constants.NEWS_CALL_BY_ID]: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            Vue.axios
                .get(`/news/${id}`)
                .then(news => resolve(news.data))
                .catch((e) => {
                    console.error(e);
                    reject();
                });
        })
    },
    [constants.NEWS_UPDATE]: ({ commit }, news) => {
        return new Promise((resolve, reject) => {
            Vue.axios
                .put(`/news/${news.id}`, news, { headers: { token: sessionStorage.getItem('token') } })
                .then(() => {
                    commit(constants.NEWS_SET_ONE_NEWS, news);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        })
    },
    [constants.NEWS_CHANGE_STATE]: ({ commit }, data) => {

        return new Promise((resolve, reject) => {
            let news = data.news;
            let highlights = data.highlights;
            let isHighlight = false;

            for (let highligh of highlights) {
                if (highligh.section_id === news.id) {
                    isHighlight = true;
                }
            }

            if (!isHighlight) {
                news.state = !news.state;
                return Vue.axios
                    .put(`/updateNewsState/${news.id}`, news, { headers: { token: sessionStorage.getItem('token') } })
                    .then(response => commit(constants.NEWS_SET_ONE_NEWS, news))
                    .catch((e) => console.log(e));
            } else {
                reject('error')
            }
        })

    },
    [constants.NEWS_CREATE_NEWS]: ({ commit }, news) => {
        return new Promise((resolve, reject) => {
            Vue.axios
                .post('/news', news, { headers: { token: sessionStorage.getItem('token') } })
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
    },
    [constants.NEWS_GET_ON_NEWS]: ({ commit }) => {
        return Vue.axios.get(`/news`)
            .then((response) => response.data)
            .then((news) => commit(constants.NEWS_SET_CURRENT_NEWS, news))
            .catch((e) => console.log(e));
    },
};

const mutations = {
    [constants.NEWS_SET_NEWS]: (state, news) => {
        state.news = news;
    },
    [constants.NEWS_SET_CURRENT_NEWS]: (state, news) => {
        state.currentNews = news;
    },
    [constants.NEWS_SET_ONE_NEWS]: (state, news) => {
        for (var i = 0; i < state.news.length; i++) {
            if (state.news[i].id === news.id) {
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
    [constants.CURRENT_NEWS]: (state) => {
        return state.currentNews;
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