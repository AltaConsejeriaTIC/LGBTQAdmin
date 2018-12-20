<template>
  <!-- <div v-resize="handleResize"> -->
  <div>

    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
    </div>
    <!-- <div v-if="thereAreComplaints"> -->
    <b-table hover stacked="lg"           :items="complaints"
             :fields="fields"             :head-variant="'light'"
             :current-page="currentPage"  :per-page="perPage"
             class="table text table-responsive-xl" ref="actionsRow">
      <template slot="actions" slot-scope="row">
        <b-button class="actions" variant="light" @click.stop="viewComplaint(row.item.id)">Ver</b-button>
      </template>
    </b-table>
    <b-pagination :total-rows="complaints.length" :per-page="perPage" v-model="currentPage" align="right"
                  :limit=5 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
    <!-- </div> -->
  </div>
    <!-- <div v-else>
      <h3>No hay Denuncias para mostrar</h3>
    </div> -->


</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as constants from '@/store/constants';
  import DetailComplaint from "./DetailComplaint";

  const moment = require('moment');
  moment.locale('es');

  export default {
    name: 'Complaint',
    components: {
      DetailComplaint
    },
    data() {
      return {
      title: "Denuncias",
      currentPage: 1,
      perPage: window.innerHeight > 992 ? (window.innerHeight-320)/110 : 5,
      fields: {
        first_name: {
          label: 'Nombre',
          sortable: true,
          class: 'white-space-pre',
          formatter: (value, key, item) => {
            return item.first_name + "\n" + item.last_name
          }
        },
        email: {
          label: 'Correo electrónico',
        },
        phone: {
          label: 'Teléfono',
        },
        event_day: {
          label: 'Fecha de denuncia',
          formatter: (value, key, item) => {
            return this.formatDate(item.event_day)
          }
        },
        actions: {
          label: 'Acciones'
        }
      }
    }
    },
    created() {
      if( !this.complaints.length )
        this.getData();
    },
    computed: {
      ...mapGetters({
        complaints: constants.COMPLAINTS
      })
    },
    methods: {
      ...mapActions({
        getData: constants.COMPLAINT_GET_COMPLAINTS,
        handleResize() {
          let rowHeight = 140;
          if(this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
            rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
          }
          this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 5;
        }
      }),
      viewComplaint(complaint){
        this.$router.push({ name: 'DetailComplaint', params: { id: complaint } });
      },
      formatDate(date) {
        return moment(date).format('YYYY-MMMM-DD');
      }
    }
  }
</script>

<style scoped>
  .complaint {
    width: 85%;
  }
  .p-title{
    font-size: 24PX;
    font-weight: bold;
    color: #3F4150;
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
</style>
