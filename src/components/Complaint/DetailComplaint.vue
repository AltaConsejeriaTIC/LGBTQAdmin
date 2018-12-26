<template>
  <div class="complaintContainer">
    <h2>Detalle Denuncia</h2>
    <div class="complaint">
      <div class="complaint__description">
        <div class="complaintTitle">
          <div class="complaint__id">{{complaint.id}}</div>
          <div>{{complaint.first_name + " " + complaint.last_name}}</div>
        </div>
        <div><label>Tipo de Documento: </label>{{ " " + complaint.document_type}}</div>
        <div><label>Número de documento: </label>{{ " " + complaint.document_number}}</div>
        <div><label>Correo: </label>{{ " " + complaint.email}}</div>
        <div><label>Teléfono: </label>{{ " " + complaint.phone}}</div>
        <div><label>Descripcion: </label>{{ " " + complaint.description}}</div>
        <div><label>Lugar: </label>{{ " " + complaint.event_place}}</div>
        <div><label>Día del evento: </label>{{ " " + formatDate(complaint.event_day)}}</div>
        <div><label>Fecha de denuncia: </label>{{ " " + formatDate(complaint.created_at)}}</div>
      </div>
    </div>
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

  .complaint {
    display: flex;
    flex-flow: row wrap;
    background: #FFFFFF;
    border: 1px solid #DBDBDB;
    box-sizing: border-box;
    border-radius: 3px;
    font-family: Nunito;
    letter-spacing: 0.01em;
    color: #3F4150;
    vertical-align: middle;
  }

  .complaint__description {
    margin:30px;
  }

  .complaint__id {
    opacity: 0.7;
    font-size: 0.8em;
  }
  label {
    display: inline-block;
    margin-top: 6px;
    margin-left: 5px;
    font-family: Nunito;
    font-weight: bold;
    line-height: 16px;
    font-size: 14px;
    letter-spacing: 0.03em;
    color: #3F4150;
  }

  .complaintTitle {
    font-size: 24px;
    line-height: 1.3;
    font-weight: bold;
    color: #3F4150;
    margin-bottom: 1.3rem;
  }

  h2 {
    margin-top:30px;
    margin-bottom: 30px;
    font-size: 24PX;
    font-weight: bold;
    color: #3F4150;
  }
</style>

