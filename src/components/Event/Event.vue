<template>
  <div>
    <h2>{{title}}</h2>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Finalización</th>
          <th>Lugar</th>
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
          <td>{{event.state ? "Publicado" : "No Publicado" }}</td>
          <td >
            <div class="ui small button" @click="changeStateEvent(event)">
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import DetailEvent from "./DetailEvent";

var moment = require('moment');

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
    })
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_EVENTS,
      changeStateEvent: constants.EVENT_CHANGE_STATE
    }),
    formatDate(date) {
      return moment(date).format('YYYY-MMMM-DD');
    },
    editEvent(eventId){
      this.$router.push({ name: 'DetailEvent', params: { id: eventId } });
    }
  }
};
</script>

<style>
.table {
  width: 80% !important;
}
</style>
