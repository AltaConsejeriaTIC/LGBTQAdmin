<template>
  <div >

    <div class="highlights-section">
      <h2>Destacados vigentes</h2>
      <table class="ui celled table">
        <thead>
          <tr>
            <th>Id Destacado</th>
            <th>Id Noticia/Evento</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <!-- <tbody v-for="event in events" :key="event.id">
          <tr >
            <td>{{event.id}}</td>
            <td :class="{disabled: !event.state}">{{event.title}}</td>
            <td>{{formatDate(event.start_date)}}</td>
            <td>{{formatDate(event.finish_date)}}</td>
            <td>{{event.place}}</td>
            <td>{{event.latitude !== 0 ? event.latitude : "NA" }}  </td>
            <td>{{event.longitude !==0 ? event.longitude : "NA"}} </td>
            <td>{{event.state ? "Publicado" : "No Publicado" }}</td>
            <td >
              <div class="ui small button" @click="changeState(event)">
                {{event.state ? "Ocultar" : "Publicar" }}
              </div>
            </td>
            <td >
              <div class="ui small button" @click="editEvent(event.id)" >
                <i class="edit icon"></i>
                Editar
              </div>
            </td>
          </tr>
        </tbody> -->
        <tbody>
        </tbody>
      </table>
    </div>

   <div class="event-news-section ui container">
        <div class="ui top attached tabular menu">
          <a class="item" data-tab="event" :class="{ active: isEventActive }" @click="switchTabs('event')" > Eventos </a>
          <a class="item" data-tab="news" :class="{ active: isNewsdActive }" @click="switchTabs('news')"> Noticias </a>
        </div>

        <div class="ui bottom attached tab segment" data-tab="event" :class="{ active: isEventActive }" >
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
              </tr>
            </tbody>
          </table>

        </div>

        <div class="ui bottom attached tab segment" data-tab="news" :class="{ active: isNewsdActive }" >

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
              </tr>
            </tbody>
          </table>

        </div>

    </div>


  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import Vue from 'vue';

var moment = require('moment');

export default {
  name: 'Home',
  data() {
    return {
      data: {},
      image: '/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errors: [],
      isEventActive: true,
      isNewsdActive: false,
    }
  },
  created() {
      this.getEvents();
      this.getNews();
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_EVENTS,
      getNews: constants.NEWS_GET_NEWS,
    }),
    switchTabs(tab) {
      if (tab === 'event') {
        this.isEventActive = true;
        this.isNewsdActive = false;
      } else {
      	this.isEventActive = false;
        this.isNewsdActive = true;
      }
    },
    formatDate(date) {
      return moment(date).format('YYYY-MMMM-DD');
    },
  },
  computed: {
    ...mapGetters({
      events: constants.EVENTS,
      news: constants.NEWS
    })
  },
}
</script>

<style>

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

</style>
