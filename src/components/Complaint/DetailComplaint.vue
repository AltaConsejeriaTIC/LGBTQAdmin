<template>
  <div>
    <h2>Detalle Denuncia</h2>
    <h3>Tipo de Documento</h3>
    <p>{{complaint.document_type}}</p>
    <h3>Número de Documento</h3>
    <p>{{complaint.document_number}}</p>
    <h3>Denunciante</h3>
    <p>{{complaint.first_name + " " + complaint.last_name}}</p>    
    <h3>Correo</h3>
    <p>{{complaint.email}}</p>
    <h3>Teléfono</h3>
    <p>{{complaint.phone}}</p>
    <h3>Descripción</h3>
    <p>{{complaint.description}}</p>
    <h3>Lugar</h3>
    <p>{{complaint.event_place}}</p>
    <h3>Día del Evento</h3>
    <p>{{formatDate(complaint.event_day)}}</p>   
    <h3>Fecha de la Denuncia</h3>
    <p>{{formatDate(complaint.created_at)}}</p>    
  </div> 
</template>

<script>
  import {mapGetters} from 'vuex';
  import * as constants from '@/store/constants';

  let moment = require('moment');

  export default {
    name: 'DetailComplaint',
    data() {
      return {
        complaint: {}
      }
    },
    created() {
      let id = this.$route.params.id;
      this.complaint = this.getComplaint(id)
    },
    computed: {
      ...mapGetters({
        getComplaint: constants.COMPLAINT_BY_ID
      })
    },
    methods: {
      formatDate(date) {
        return moment(date).format('YYYY-MMMM-DD');
      }
    }
  }
</script>

<style scoped>

</style>

