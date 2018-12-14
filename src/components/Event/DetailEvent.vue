<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="data.image" :w="350" :h="280" ref="imgContent"></ImageContent>
    </div>
    <div class="ten wide column">
      <div v-if="errors.length">
        <b>Por favor corriga los siguientes errores:</b>
        <ul>
          <li v-for="error in errors" >{{ error }}</li>
        </ul>
      </div>
      <form class="ui form" @submit="checkForm">
        <div class="field">
          <label>Titulo</label>
          <input type="text" v-model="data.title">
          <label>Descripción</label>
          <textarea rows="5" v-model="data.description"></textarea>
        </div>
        <div class="ui two column grid">
          <div class="row">
            <div class="column">
              <div class="field">
                <label>Fecha de inicio: {{data.start_date}}</label>
                <input type="date" v-model="data.start_date">
                <label>Hora de inicio: {{data.start_time}}</label>
                <input type="time" v-model="data.start_time">
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label>Fecha de fin: {{data.finish_date}}</label>
                <input type="date" v-model="data.finish_date">
                <label>Hora de fin: {{data.finish_time}}</label>
                <input type="time" v-model="data.finish_time">
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label>Lugar</label>
          <input type="text" v-model="data.place">
        </div>
        <div class="ui two column grid">
          <div class="row">
            <div class="column">
              <label>Latitud</label>
              <input type="number" step="0.0000001" v-model="data.latitude">
            </div>
             <div class="column">
              <label>longitud</label>
              <input type="number" step="0.0000001" v-model="data.longitude">
            </div>
          </div>
        </div>
        <div class="field">
          <label>Dirección</label>
          <input type="text" v-model="data.address">
        </div>
        <button class="ui button" type="submit" >Guardar</button>
      </form>
    </div>
    <div class="fifteen wide column">
      <button class="ui button back" @click="goBack">
        <i class="caret left icon"></i>
        Volver
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImageContent from '../Image/ImageContent'
import * as constants from '@/store/constants';
import * as ENV from '../../env';

var moment = require('moment');

export default {
  name: 'DetailEvent',
  components: {
    ImageContent
  },
  data() {
    return {
      data: {},
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
    this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
    if(!this.data.place){
      this.data.place = "";
    }
  },
  computed: {
    ...mapGetters({
      get: constants.EVENT_BY_ID
    })
  },
  methods: {
    ...mapActions({
      updateEvent: constants.EVENT_UPDATE
    }),
    save() {      
      this.data.state = true;
      this.data.latitude = !parseFloat( this.data.latitude )? 0 : parseFloat( this.data.latitude );
      this.data.longitude = !parseFloat( this.data.longitude ) ? 0 : parseFloat( this.data.longitude );
      this.$refs.imgContent.uploadImage();
      this.updateEvent(this.data)
        .then( () => {
          alert("Evento fue actualizado exitosamente")
          this.$router.push('/events');
        })
        .catch( () => alert("No se pudo actualizar"))    
    },    
    checkForm(event) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');        
      }else{
        let lenTit = this.data.title.length;
        if (lenTit > 50) {
          this.errors.push('Título no válido. Tamaño máximo del título 50 caracteres.');
        }
      }           
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }else{
        let lenDes = this.data.description.length;
        if (lenDes < 150 || lenDes > 800) {
          this.errors.push('La descripción debe contener mínimo 150 y máximo 800 caracteres');
        }
      }
      if (!this.data.address) {
        this.errors.push('Dirección es requerida.');
      }
      let currentDateAndHour = new Date();      
      if (!this.data.start_date){
        this.errors.push('Fecha de inicio requerida.');
      }            
      if (!this.data.finish_date){
        this.errors.push('Fecha de fin requerida.');
      }
      if (this.data.start_date > this.data.finish_date){
        this.errors.push('La fecha de fin debe ser mayor o igual a la fecha de inicio.');
      }
      if (!this.data.start_time) {
        this.errors.push('Hora de inicio requerida.');
      }
      if (!this.data.finish_time) {
        this.errors.push('Hora de fin requerida.');
      }
      if (this.data.start_date === this.data.finish_date){
        if (this.data.start_time > this.data.finish_time){
          this.errors.push('La hora de fin debe ser mayor a la hora de inicio.');
        }
      }
      event.preventDefault();
      if(this.errors.length === 0)
        this.save();
    },
    addZero(number){
      if(number < 10){
        number = "0"+1;
      }
      return number;
    },
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/dashboard')
    }
  }
}
</script>

<style>
  .ui.button.back {
    float: right;
  }
  .ui.grid {
    width: 80%;
  }
</style>
