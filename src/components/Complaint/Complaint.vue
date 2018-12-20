<template>
  <div class='complaint'>
    <div class="p-title">Denuncia</div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Número de Documento</th>
          <th>Correo</th>
          <th>Día del Evento</th>
        </tr>
      </thead>
       <tbody v-for="complaint in complaints" :key="complaint.id">
        <tr >
          <td>{{complaint.document_number}}</td>
          <td>{{complaint.email}}</td>
          <td>{{formatDate(complaint.event_day)}}</td>
          <td >
            <div class="ui small button" @click="viewComplaint(complaint)" >
              <i class="external alternate icon"></i>
              Ver Detalle
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as constants from '@/store/constants'

  let moment = require('moment');

  export default {
    name: 'Complaint',
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
        getData: constants.COMPLAINT_GET_COMPLAINTS
      }),
      viewComplaint(complaint){
        this.$router.push({ name: 'DetailComplaint', params: { id: complaint.id } });
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
</style>


