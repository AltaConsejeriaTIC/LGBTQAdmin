<template>
  <div>
    <h2>{{title}}</h2>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Fuente</th>
          <th>Fecha</th>
        </tr>
      </thead>
       <tbody v-for="n in news" :key="n.id">
        <tr >
          <td>{{n.id}}</td>
          <td :class="{disabled: !n.state}">{{n.title}}</td>
          <td>{{n.source}}</td>
          <td>{{formatDate(n.date)}}</td>
          <td>{{n.state ? "Publicado" : "No Publicado" }}</td>
          <td >
            <div class="ui small button" @click="changeStateNews(n)">
              {{n.state ? "Ocultar" : "Publicar" }}
            </div>
          </td>
          <td >
            <div class="ui small button" @click="editNews(n.id)" >
              <i class="edit icon"></i>
              Editar
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import DetailNews from "./DetailNews";

var moment = require('moment');

export default {
  name: 'News',
  components: {
    DetailNews
  },
  data() {
    return {
      title: "Noticias"
    }
  },
  created() {
    if ( !this.news.length )
      this.getNews()
  },
  computed: {
    ...mapGetters({
      news: constants.NEWS
    })
  },
  methods: {
    ...mapActions({
      getNews: constants.NEWS_GET_NEWS,
      changeStateNews: constants.NEWS_CHANGE_STATE
    }),
    formatDate(date) {
      return moment(date).format('YYYY-MMMM-DD');
    },
    editNews(newsId){
      this.$router.push({ name: 'DetailNews', params: { id: newsId } });
    }
  }
};
</script>

<style>
.table {
  width: 80% !important;
}
</style>
