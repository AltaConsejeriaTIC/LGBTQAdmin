<template>
  <div>   
    <h2>Detalle Denuncia</h2> 
    <div class="complaint">      
      <div class="flex-item">
        <div>
          <div class="item">            
            <h3>Denunciante</h3>
            <div class="box">
              <p>{{complaint.first_name + " " + complaint.last_name}}</p>       
            </div>
          </div>
          <div class="item">            
            <h3>Teléfono</h3>
            <div class="box">
              <p>{{complaint.phone}}</p>       
            </div>
          </div>
        </div>
        <div>
          <div class="item">
            <h3>Tipo de Documento</h3>
            <div class="box">
              <p>{{complaint.document_type}}</p>
            </div>
            <h3>Número de Documento</h3>
            <div class="box">
              <p>{{complaint.document_number}}</p>       
            </div> 
          </div>
        </div>
        <div>
          <div class="item">           
            <h3>Correo</h3>
            <div class="box">
              <p>{{complaint.email}}</p>       
            </div>
            <h3>Lugar</h3>
            <div class="box">
              <p>{{complaint.event_place}}</p>      
            </div> 
          </div>
        </div>  
        <div>
          <div class="item">   
            <h3>Día del Evento</h3>
            <div class="box">
              <p>{{formatDate(complaint.event_day)}}</p>        
            </div>
            <h3>Fecha de la Denuncia</h3>
            <div class="box">
              <p>{{formatDate(complaint.created_at)}}</p>       
            </div>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <div class="description">
          <h3>Descripción</h3>
          <div class="description-box">
            <p>{{complaint.description}}</p>      
          </div>
        </div>
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
    justify-content: space-between;    
  }

  .flex-item {
    width: 655px;
    margin-top: 10px;    
    line-height: 150px;   
    display: flex;    
    flex-flow: row wrap;
    justify-content: space-between;    
  }

  .item {
    width: 315px;
    margin-top: 10px;    
    line-height: 150px; 
  }

  .description {
    width: 100%;
  }
  
  .box {
    background: #FFFFFF;
    border: 1px solid #DBDBDB;
    box-sizing: border-box;
    border-radius: 3px;
    font-family: Nunito;
    font-style: normal;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    letter-spacing: 0.01em;
    color: #3F4150;
    vertical-align: middle;
    padding-left: 10px;
  }
  .description-box {
    background: #FFFFFF;
    border: 1px solid #DBDBDB;
    box-sizing: border-box;
    border-radius: 3px;
    font-family: Nunito;
    font-style: normal;
    line-height: 40px;
    font-size: 13px;
    letter-spacing: 0.01em;
    color: #3F4150;
    vertical-align: middle;
    padding-left: 10px;
    height:181px;
  }

  h3 {
    margin-top: 10px;
    margin-left: 2px;
    font-family: Nunito;
    font-weight: bold;
    line-height: 14px;
    font-size: 11px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #575A6D;
  }

  h2 {
    margin-top:30px;
    font-size: 24PX;
    font-weight: bold;
    color: #3F4150;
  }
</style>

