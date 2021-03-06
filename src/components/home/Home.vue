<template>
  <div >
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
    </div>

    <div class="highlights-section" >
      <b-table hover stacked="lg"          :items="data"
              :fields="fields"             :head-variant="'light'"
              :current-page="currentPage"  :per-page="perPage"
              class="table text table-responsive-md" ref="actionsRow">
        <template slot="actions" slot-scope="row">
          <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button variant="danger" @click.stop="deleteHighlightById(row.item.id) " ><i class="fas fa-trash-alt"></i></b-button>
        </template>
      </b-table>
      <b-modal ref="noHighlights"
               ok-only
               hide-header
               ok-title="Aceptar"
               ok-variant="primary"
               class="mt-3"
               @ok="show=false">
               <div class="d-block text-center">
                  <h4>No hay noticias ni eventos destacados.</h4>
                </div>
      </b-modal>
      <b-modal ref="oneHighlights"
               ok-only
               hide-header
               ok-title="Aceptar"
               ok-variant="primary"
               class="mt-3"
               @ok="show=false">
               <div class="d-block text-center">
                  <h4>Aún puede destacar un evento o una noticia.</h4>
                </div>
      </b-modal>
      <b-modal ref="twoHighlights"
               ok-only
               hide-header
               ok-title="Aceptar"
               ok-variant="primary"
               class="mt-3"
               @ok="show=false">
               <div class="d-block text-center">
                  <h4>Aún puede destacar dos eventos o noticias</h4>
                </div>
      </b-modal>
    </div>
    <b-tabs>
      <b-tab title="Eventos" active>
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Título</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Finalización</th>
              <th>Lugar</th>
            </tr>
          </thead>
          <tbody v-for="event in events" :key="event.id">
            <tr >
              <td>{{event.id}}</td>
              <td :class="{disabled: !event.state}">{{event.title}}</td>
              <td>{{formatDate(event.start_date)}}</td>
              <td>{{formatDate(event.finish_date)}}</td>
              <td>{{event.place}}</td>
              <td >
                <b-button :disabled="disableButtonN(event, 'event')" @click="postHighlight( event ,'event')" class="btn actions btn-light" >Destacar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab title="Noticias" >
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
                <td >
                  <b-button :disabled="disableButtonN( n, 'news' )"  @click="postHighlight( n ,'news')" class="btn actions btn-light">Destacar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import Vue from 'vue';
import Highlight from '@/store/modules/highlight'

var moment = require('moment');

export default {
  name: 'Home',
  data() {
    return {
      title: "Eventos y noticias destacados",
      currentPage: 1,
      perPage: window.innerHeight > 992 ? (window.innerHeight-320)/110 : 5,
      fields: {
        section_id: {
          label: 'ID de Sección',
          sortable: false,
          class: 'id'
        },
        section: {
          label: 'Sección',
          sortable: true,
        },
        title: {
          label: 'Título',
          sortable: true
        },
        actions: {
          label: 'Acciones'
        }
      },
      data: [],
      image: '/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errors: [],
      isEventActive: true,
      isNewsdActive: false,
      showAlert: true
    }
  },
  created() {
    this.getEvents();
    this.getNews();
  },
  computed: {
    ...mapGetters({
      events: constants.CURRENT_EVENTS,
      news: constants.CURRENT_NEWS,
      highlights: constants.HIGHLIGHTS
    }),
    disableButtonN: function() {
      return (data, checkString) => {
        let check = false;
        for( let high of this.highlights){
          if( high.section_id === data.id && high.section === checkString ){
            check = true;
          }
        }
        return check;
      }
    }
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_ON_EVENTS,
      getNews: constants.NEWS_GET_ON_NEWS,
      getHighlights: constants.HIGHLIGHT_GET_HIGHLIGHT,
      createHighlight: constants.HIGHLIGHT_CREATE_HIGHLIGHT,
      deleteHighlight: constants.HIGHLIGHT_DELETE_HIGHLIGHT
    }),
    loadHighlights() {
      if(this.events.length !== 0 && this.news.length !== 0){
        this.getHighlights()
          .then(() =>{
            if(this.highlights.length < 3 && this.showAlert ){
              this.showMessage(this.highlights.length);
              this.showAlert = false;
            }
          })
      }
    },
    showMessage( number ) {
      if(number === 0)
        this.$refs.noHighlights.show();
      else if(number == 2)
        this.$refs.oneHighlights.show();
      else
        this.$refs.twoHighlights.show();
    },
    postHighlight( data, section ){
      const curr = {
        "section_id": data.id,
        "section": section
      }

      this.createHighlight( curr );
    },
    deleteHighlightById( id ){
      this.deleteHighlight( id );
    },
    formatDate(date) {
      return moment(date).format('YYYY-MMMM-DD');
    },
    findTitle(sectionId, section) {
      let highlight;
      if(section==="event")
        highlight = this.events.find( element => element.id === sectionId)
      else
        highlight = this.news.find( element => element.id === sectionId)

      return highlight.title;
    },
    assignSection( section ){
      if(section==="event")
        return "Evento";
      else
        return "Noticia";
    },
    createTableElement( highlight ) {
      let elementToTable = {
        id: highlight.id,
        section_id: highlight.section_id,
        title: this.findTitle(highlight.section_id, highlight.section),
        section: this.assignSection(highlight.section)
      }
      return elementToTable;
    },
    loadHighlightsTable() {
      this.data = [];
      for( let highlight of this.highlights){
        this.data.push(this.createTableElement(highlight));
      }
    }
  },
  watch: {
    events() {
      this.loadHighlights();
    },
    news() {
      this.loadHighlights();
    },
    highlights() {
      this.loadHighlightsTable();
    }
  }

}
</script>

<style>
  .form-control.is-valid{
    border: 1px solid #ced4da;
  }

  .highlights-section{
    padding-bottom: 6%;
  }

  .ui.container{
    margin: 0 !important;
    padding: 0 !important;
  }

  .event-news-section{
    margin: 0% !important;
    padding: 0% !important;
    display: flex;
    justify-content: center;
  }

  button.actions {
    width: 80px;
  }

  .was-validated .form-control:valid, .form-control.is-valid, .was-validated .custom-select:valid, .custom-select.is-valid {
    border: 1px solid #ced4da;
    }
</style>
