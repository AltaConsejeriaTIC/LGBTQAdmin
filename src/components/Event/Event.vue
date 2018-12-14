<template>
  <div class="event">
    <button class="ui button" @click="newEvent">Crear Evento</button>
    <div v-if="thereAreEvents">
      <h2>{{title}}</h2>    
      <table class="ui celled table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Finalización</th>
            <th>Lugar</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Estado</th>

          </tr>
        </thead>
        <tbody v-for="event in events" :key="event.id">
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
        </tbody>
      </table>
    </div>    
    <div v-else>
      <h3>No hay Eventos Vigentes</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import DetailEvent from "./DetailEvent";

var moment = require('moment');
moment.locale('es');

export default {
  name: 'Event',
  components: {
    DetailEvent
  },
  data() {
    return {
      title: "Eventos Vigentes"
    }
  },
  created() {
    if ( !this.events.length )
      this.getEvents()
  },  
  computed: {
    ...mapGetters({
      events: constants.EVENTS
    }),
    thereAreEvents() {
      return this.events.length !== 0;
    }
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_EVENTS,
      changeStateEvent: constants.EVENT_CHANGE_STATE
    }),
    formatDate(date) {
      return moment(date).format('DD-MMMM-YYYY');
    },
    editEvent(eventId){
      this.$router.push({ name: 'DetailEvent', params: { id: eventId } });
    },
    newEvent() {
      this.$router.push({ name: 'NewEvent' });
    },
    changeState(event) {
      this.changeStateEvent(event);
    }
  },
};
</script>

<style>
  .event {
    width: 80%;
  }
</style>
