<template>
  <div v-resize="handleResize">
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right big text" @click="newEvent">Agregar Evento</button>
    </div>
    <div v-if="thereAreEvents">
    <b-table hover stacked="lg"           :items="events"
             :fields="fields"             :head-variant="'light'"
             :current-page="currentPage"  :per-page="perPage"
             class="table text table-responsive-xl" ref="actionsRow">
      <template slot="state" slot-scope="row">{{row.value?'Publicado':'No Publicado'}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button class="actions" variant="light" @click.stop="changeState(row.item)">{{row.item.state ? "Ocultar" : "Publicar" }}</b-button>
        <b-button class="actions" variant="light" @click.stop="editEvent(row.item.id)">Editar</b-button>
      </template>
    </b-table>
    <b-pagination :total-rows="events.length" :per-page="perPage" v-model="currentPage" align="right"
                  :limit=5 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
    </div>
    <div v-else>
      <h3>No hay Eventos Vigentes</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';
import DetailEvent from "./DetailEvent";

const moment = require('moment');
moment.locale('es');

export default {
  name: 'Event',
  components: {
    DetailEvent
  },
  data() {
    return {
      title: "Administrar Eventos",
      currentPage: 1,
      perPage: window.innerHeight > 992 ? (window.innerHeight-320)/110 : 5,
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
        start_date: {
          label: 'Fecha',
          sortable: true,
          class: 'white-space-pre',
          formatter: (value, key, item) => {
            return this.formatDate(item.start_date) + "\n" + this.formatDate(item.finish_date)
          }
        },
        place: {
          label: 'Lugar'
        },
        state: {
          label: 'Estado'
        },
        actions: {
          label: 'Acciones'
        }
      }
    }

  },
  created() {
    if ( !this.events.length ){
      this.getEvents();
    }
    this.events.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
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
      changeStateEvent: constants.EVENT_CHANGE_STATE,
      handleResize() {
        let rowHeight = 140;
        if(this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
          rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
        }
        this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 5;
      }
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
      this.events.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
    }
  },
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

  .btn{
    border: 1px solid #cbced0;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    font-size: 14px !important;

  }

  .btn.big{
    height: 44px;
  }

  .btn-warning{
    width: 154px;

    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }

  table.table{
    text-align: left;
    background-color: #fff;
    margin-top: 24px;
    margin-bottom: 0;
    height: auto;
    overflow-y: auto;
    max-height: 70%;
  }

  table.table td, table.table th{
    vertical-align: middle;
  }
  td:nth-child(3) {
    width: 113px;
  }
  td:nth-child(6) {
    width: 183px;
  }
  table.table tr{
    min-height: 43px;
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

  tbody tr.table-disable{
    font-weight: 600;
    color: #999BAA;
  }

  .btn-light{
    background: #DFE0E1;
    border: 1px solid #CBCED0;
    box-sizing: border-box;
    border-radius: 4px;

  }

  button.actions{
    height: 32px;
    width: 73px;
    line-height: 20px;
    font-size: 13px;
  }
  button.actions:first-child{
    margin-bottom: 0;
    margin-right: 10px;
  }

  .white-space-pre {
    white-space: pre-wrap;
  }

  @media (max-width: 1100px){
    td:nth-child(6){
      width: unset;
    }
    button.actions:first-child{
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 992px) {
    td:nth-child(3){
      width: unset;
    }



    button.actions:first-child{
      margin-bottom: 0;
      margin-right: 7px;
    }
  }

  @media (max-width: 629px) {
    button.actions:first-child{
      margin-bottom: 10px;
    }
  }

</style>
