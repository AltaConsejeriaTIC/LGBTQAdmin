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
import { mapActions, mapGetters, mapState } from 'vuex';
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
    ...mapState({
      highlights: (state) => state.Highlight.highlights
    }),
    thereAreEvents() {
      return this.events.length !== 0;
    }
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_EVENTS,
      changeStateEvent: constants.EVENT_CHANGE_STATE,
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
      this.changeStateEvent( {
        event: event,
        highlights: this.highlights
      } );
      this.events.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
    },
    handleResize() {
      let rowHeight = 140;
      if(this.$refs.actionsRow && this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
        rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
      }
      this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 6;
    }
  },
};
</script>

<style>



</style>

<style scoped>
  .btn-warning{
    width: 154px;
    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }

  .table >>> td:nth-child(3) {
    width: 155px;
  }
  .table >>> td:nth-child(6) {
    width: 183px;
  }

  @media (max-width: 1100px) {
    .table >>> td:nth-child(6) {
      width: unset;
    }
  }

  @media (max-width: 992px) {
    .table >>> td:nth-child(3) {
      width: unset;
    }
  }

  .btn-warning{
    width: 154px;

    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }
</style>
