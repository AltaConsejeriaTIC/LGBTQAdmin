<template>
  <div>
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right create text" @click="newEvent">Agregar Evento</button>
    </div>
    <table class="table .text">
      <thead class="thead-light">
        <tr>
          <th scope="col" class="id">Id</th>
          <th scope="col">Título</th>
          <th scope="col">Fecha de Inicio</th>
          <th scope="col">Lugar</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>

        </tr>
      </thead>
       <tbody v-for="event in events" :key="event.id">
        <tr :class="{disabled: !event.state}">
          <th scope="row" class="id">{{event.id}}</th>
          <td>{{event.title}}</td>
          <td>{{formatDate(event.start_date)}}<br>{{formatDate(event.finish_date)}}</td>
          <td>{{event.place}}</td>
          <td>{{event.state ? "Publicado" : "No Publicado" }}</td>
          <td >
            <button type="button" class="btn btn-light actions" @click="changeState(event)">
              {{event.state ? "Ocultar" : "Publicar" }}
            </button>
            <button type="button" class="btn btn-light actions" @click="editEvent(event.id)" >
              <i class="edit icon"></i>
              Editar
            </button>
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
      title: "Administrar Eventos"
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
    },
    newEvent() {
      this.$router.push({ name: 'NewEvent' });
    },
    changeState(event) {
      this.changeStateEvent(event);
    }
  }
};
</script>

<style>
  .p-title{
    margin: 20px 0;
    height: 44px;
  }

  .text{
    font-weight: bold;
    line-height: 27px;
    font-size: 22px;
    font-style: normal;
    font-family: Nunito,Arial,monospace;
    color: #3F4150;
  }

  button.create{
    width: 154px;
    height: 44px;
    border: 1px solid #E0AE0D;
    box-sizing: border-box;
    border-radius: 4px;

    font-weight: bold;
    line-height: 21px;
    font-size: 14px;
    text-align: center;
    color: #161824;
  }

  table.table{
    text-align: left;
    background-color: #fff;
    margin-top: 24px;
  }

  table.table td{
    vertical-align: middle;
    height: 43px;
  }

  table.table tr{
    height: 43px;
  }
  thead{
    text-transform: uppercase;
  }

  .table .thead-light th{
    background-color: #F9FAFB;
    line-height: 14px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #7C7F92;
  }

  .table .id{
    vertical-align: middle;
    text-align: center;
  }

  tbody tr{
    font-weight: 800;
    line-height: 20px;
    font-size: 14px;
    color: #3F4150;
  }

  tbody tr.disabled{
    font-weight: 600;
    color: #999BAA;
  }

  button.actions{
    height: 35px;
    width: 92px;
    background: #DFE0E1;
    border: 1px solid #CBCED0;
    box-sizing: border-box;
    border-radius: 4px;
    line-height: 20px;
    font-size: 13px;
    text-align: center;
    margin-right: 20px;
  }

</style>
