<template>
  <div v-if="complaint" >
    <div class="complaintContainer" >
      <div class="p-title text">
        <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
        <h2>Detalle Denuncia</h2>
      </div>
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
          <div class="description_content"><label>Descripcion: </label><p>{{complaint.description}}</p></div>
          <div><label>Lugar: </label>{{ " " + complaint.event_place}}</div>
          <div><label>Día del evento: </label>{{ " " + formatDate(complaint.event_day)}}</div>
          <div><label>Fecha de denuncia: </label>{{ " " + formatDate(complaint.created_at)}}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h2> Cargando ...</h2>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
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
      if( typeof this.data === 'undefined')
        this.getById(id).then( complaint => this.complaint = complaint )
    },
    computed: {
      ...mapGetters({
        getComplaint: constants.COMPLAINT_BY_ID
      })
    },
    methods: {
      ...mapActions({
        getById: constants.COMPLAINT_CALL_BY_ID
      }),
      formatDate(date) {
        return moment(date).format('YYYY-MMMM-DD');
      },
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/complaints')
      },
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
    margin-top:10px;
    margin-bottom: 30px !important;
    font-size: 24PX;
    font-weight: bold;
    color: #3F4150;
  }

  p {
    margin-left: 5px;
    margin-top: -2px;
    text-align: justify;
    line-height:1.15em;
  }

  .p-title {
    text-align: left;
    margin: 23px 0px;
    height: 44px;
    margin-bottom: 60px;
  }
</style>

