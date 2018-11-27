<template>
  <div>
    <button class="ui button" @click="newAlliance">Crear Alianza</button>
    <h2>{{title}}</h2>
    <table class="ui celled table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Sitio Web</th>
        <th>Fecha de Finalización</th>
      </tr>
      </thead>
      <tbody v-for="alliance in alliances" :key="alliance.id">
      <tr >
        <td>{{alliance.id}}</td>
        <td :class="{disabled: !alliance.state}">{{alliance.name}}</td>
        <td>{{alliance.website}}</td>
        <td>{{formatDate(alliance.finish_date)}}</td>
        <td>{{alliance.state ? "Publicado" : "No Publicado" }}</td>
        <td >
          <div class="ui small button" @click="changeStateAlliance(alliance)">
            {{alliance.state ? "Ocultar" : "Publicar" }}
          </div>
        </td>
        <td >
          <div class="ui small button" @click="editAlliance(alliance.id)" >
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
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';

var moment = require('moment');

export default {
    name: "Alliance",
    data() {
      return {
        title: "Alianzas"
      }
    },
    created() {
      if ( !this.alliances.length )
        this.getAlliances()
    },
    computed: {
      ...mapGetters({
        alliances: constants.ALLIANCES
      })
    },
    methods: {
      ...mapActions({
        getAlliances: constants.ALLIANCE_GET_ALLIANCES,
        changeStateAlliance: constants.ALLIANCE_CHANGE_STATE
      }),
      formatDate(date) {
        return moment(date).format('YYYY-MMMM-DD');
      },
      editAlliance(allianceId){
        this.$router.push({ name: 'DetailAlliance', params: { id: allianceId } });
      },
      newAlliance() {
        this.$router.push({ name: 'NewAlliance' });
      }
    }
}
</script>

<style scoped>

</style>
