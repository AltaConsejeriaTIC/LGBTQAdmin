<template>
  <div v-resize="handleResize">
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right big text" @click="newNews">Agregar Noticia</button>
    </div>
    <div v-if="thereAreNews">
      <b-table hover stacked="lg"           :items="news"
               :fields="fields"             :head-variant="'light'"
               :current-page="currentPage"  :per-page="perPage"
               class="table text table-responsive-xl" ref="actionsRow">
        <template slot="state" slot-scope="row">{{row.value?'Publicado':'No Publicado'}}</template>
        <template slot="actions" slot-scope="row">
          <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button class="actions" variant="light" @click.stop="changeNewState(row.item)">{{row.item.state ? "Ocultar" : "Publicar" }}</b-button>
          <b-button class="actions" variant="light" @click.stop="editNews(row.item.id)">Editar</b-button>
        </template>
      </b-table>
      <b-pagination :total-rows="news.length" :per-page="perPage" v-model="currentPage" align="right"
                    :limit=5 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
    </div>
    <div v-else>
      <h3>No hay Noticias Vigentes</h3>
    </div>
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
      title: "Administrar Noticias",
      currentPage: 1,
      perPage: 5,
      fields: {
        id: {
          label: 'ID',
          sortable: true,
          class: 'id'
        },
        title: {
          label: 'Titulo',
          sortable: false
        },
        source: {
          label: 'Fuente'
        },
        date: {
          label: 'Fecha',
          sortable: true,
          class: 'white-space-pre',
          formatter: (value) => {
            return this.formatDate(value);
          }
        },
        state: {
          label: 'Estado'
        },
        actions: {
          class: 'p-actions',
          label: 'Acciones'
        }
      }
    }
  },
  created() {
    if ( !this.news.length )
      this.getNews()

  },
  computed: {
    ...mapGetters({
      news: constants.NEWS
    }),
    ...mapState({
      highlights: (state) => state.Highlight.highlights
    }),
    thereAreNews() {
      return this.news.length !== 0;
    }
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
    },
    newNews() {
      this.$router.push({ name: 'NewNews' });
    },
    handleResize() {
      if(this.news.length !== 0){
        let rowHeight = 140;
        if(this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
          rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
        }
        this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 5;
      }
      this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 6;
    },
    changeNewState( news ){
      this.changeStateNews( {
        news: news,
        highlights: this.highlights
      } );
      this.news.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
    }
  }
};
</script>

<style scoped>
  .btn-warning{
    width: 154px;
    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }

  .table >>> td:nth-child(4) {
    width: 155px;
  }

  @media (max-width: 1100px) {
    .table >>> td:nth-child(6) {
      width: unset;
    }
  }

  @media (max-width: 992px) {
    .table >>> td:nth-child(4) {
      width: unset;
    }
  }
</style>
