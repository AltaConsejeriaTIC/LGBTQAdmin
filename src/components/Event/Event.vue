<template>
  <div>
    <!-- <input type="text" placeholder="Ingresar Evento">
    <button>Agregar Tarea</button> -->

    <h1>{{title}}</h1>
    <ul>
      <li v-for="(event, index) in events" v-bind:key="index">
        {{event}}
      </li>
    </ul>

    <button @click="refresh">Recargar Eventos</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Event',
  computed: {
    ...mapState({
      title: (state) => state.Event.title
    }),
    ...mapGetters({
      events: constants.EVENTS
    })
  },
  methods: {
    ...mapActions({
      getEvents: constants.EVENT_GET_EVENTS
    }),
    refresh() {
      this.getEvents();
    }
  }
};
</script>

<style>
</style>
