<template>
  <div v-resize="handleResize">
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right big text" @click="newAlliance">Agregar Alianza</button>
    </div>
    <div v-if="thereAreAliances">
      <b-table hover stacked="lg"           :items="alliances"
               :fields="fields"             :head-variant="'light'"
               :current-page="currentPage"  :per-page="perPage"
               class="table text table-responsive-xl" ref="actionsRow">
        <template slot="state" slot-scope="row">{{row.value?'Publicado':'No Publicado'}}</template>
        <template slot="actions" slot-scope="row">
          <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button class="actions" variant="light" @click.stop="changeState(row.item)">{{row.item.state ? "Ocultar" : "Publicar" }}</b-button>
          <b-button class="actions" variant="light" @click.stop="editAlliance(row.item.id)">Editar</b-button>
        </template>
      </b-table>
      <b-pagination :total-rows="alliances.length" :per-page="perPage" v-model="currentPage" align="right"
                    :limit=5 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
    </div>
    <div v-else>
      <h3>No hay Alianzas Vigentes</h3>
    </div>
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
      title: "Alianzas",
      currentPage: 1,
      perPage: 10,
      fields: {
        id: {
          label: 'ID',
          sortable: true,
          class: 'id'
        },
        name: {
          label: 'Nombre',
          sortable: true
        },
        website: {
          label: 'Sitio web'
        },
        finish_date: {
          label: 'Fecha de expiración',
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
    if ( !this.alliances.length )
      this.getAlliances()
    this.alliances.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');

  },
  computed: {
    ...mapGetters({
      alliances: constants.ALLIANCES
    }),
    thereAreAliances() {
      return this.alliances.length !== 0;
    }
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
    },
    changeState(alliance) {
      this.changeStateAlliance(alliance);
      this.alliances.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
    },
    handleResize() {
      if(this.alliances.length !== 0){
        let rowHeight = 140;
        if(this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
          rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
        }
        this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 5;
      }
    }
  },
  watch: {
    alliances(){
      this.alliances.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
    }
  }
}
</script>

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
</style>
