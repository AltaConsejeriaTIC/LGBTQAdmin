<template>
  <div>
    <div v-if="data">
      <div class="p-title text">
       <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
        <h2 class="d-inline float-left text">Editar Evento</h2>
      </div>
      <div v-if="errors.length" class="p-errors">
        <b>Por favor corriga los siguientes errores:</b>
        <ul>
          <li v-for="error in errors" >{{ error }}</li>
        </ul>
      </div>
      <div class="container-fluid row">
        <b-form class="p-form col" @submit="checkForm">
          <b-form-group id="titleGroup" label="Título: " label-for="title">
            <b-form-input id="title" type="text" v-model="data.title"
                           placeholder="Título">
            </b-form-input>
            <p>Máx. 50 caracteres</p>
          </b-form-group>
          <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
            <b-form-textarea  id="description" type="text" v-model="data.description"
                               placeholder="Descripción" :rows="3" :max-rows="5"
                              v-bind:no-resize="true">
            </b-form-textarea>
            <p>Mín. 150, Máx. 800 caracteres</p>
          </b-form-group>
          <b-form-row>
            <b-col>
              <b-form-group id="start_dateGroup" label="Fecha de inicio:" label-for="start_date">
                <b-form-input id="start_date" type="date" v-model="data.start_date"
                               placeholder="Fecha de inicio">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="finish_dateGroup" label="Fecha de fin:" label-for="finish_date">
                <b-form-input id="finish_date" type="date" v-model="data.finish_date"
                               placeholder="Fecha de fin">
                </b-form-input>
              </b-form-group>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <b-form-group id="start_timeGroup" label="Hora de inicio:" label-for="start_time">
                <b-form-input id="start_time" type="time" v-model="data.start_time.split(' ')[0]"
                               placeholder="Hora de inicio" >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="finish_timeGroup" label="Hora de fin:" label-for="finish_time">
                <b-form-input id="finish_time" type="time" v-model="data.finish_time.split(' ')[0]"
                               placeholder="Hora de fin">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-group id="placeGroup" label="Lugar:" label-for="place">
            <b-form-input id="place" type="text" v-model="data.place"
                           placeholder="Lugar">
            </b-form-input>
          </b-form-group>
          <b-form-group id="addressGroup" label="Dirección:" label-for="address">
            <b-form-input id="address" type="text" v-model="data.address"
                           placeholder="Dirección">
            </b-form-input>
          </b-form-group>
          <b-form-row class="form-row float-right">
            <b-col>
              <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
            </b-col>
          </b-form-row>


        </b-form>
        <div class="col-12 col-md-auto" >
          <ImageContent :img="data.image" :w="420" :h="336" ref="imgContent" class="image"></ImageContent>
        </div>
      </div>
    </div>
    <h2 v-else-if="error">Error cargando los datos.</h2>
    <div v-else>
      <h2>Cargando ...</h2>
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
      error: false,
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    if( typeof this.data === 'undefined'){
      this.getById(id)
        .then( event =>{
          this.data = event
          this.parseDate()
        }).
        catch(error => this.error = true)
    }else{
      this.parseDate();
      if(!this.data.place){
        this.data.place = "";
      }
    }
  },
  computed: {
    ...mapGetters({
      get: constants.EVENT_BY_ID
    })
  },
  methods: {
    ...mapActions({
      updateEvent: constants.EVENT_UPDATE,
      getById: constants.EVENT_CALL_BY_ID
    }),
    save() {
      this.data.state = true;
      this.data.latitude = !parseFloat( this.data.latitude )? 0 : parseFloat( this.data.latitude );
      this.data.longitude = !parseFloat( this.data.longitude ) ? 0 : parseFloat( this.data.longitude );
      this.$refs.imgContent.uploadImage();
      delete this.data._rowVariant;
      this.updateEvent(this.data)
        .then( () => {
          alert("Evento fue actualizado exitosamente")
          this.$router.push('/events');
        })
        .catch( () => alert("No se pudo actualizar"))
    },
    parseDate() {
      this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
      this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
      this.data.start_time = moment(this.data.start_time,"h:mm a").format('HH:MM');
      this.data.finish_time = moment(this.data.finish_time,"h:mm a").format('HH:MM');
    },
    checkForm(event) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');
      }else{
        let lenTit = this.data.title.length;
        if (lenTit > 50) {
          this.errors.push('el título puede contener máximo 50 caracteres.');
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

<style scoped>
 .btn-danger{
   color: #FFF;
   background: #E75252;
   border-radius: 4px;
   width: 145px;
   height: 40px;
 }
 p {
   color: #A8ABBA;
 }

 .p-form{
   text-align: left;
   font-style: normal;
   font-weight: 800;
   line-height: 1.4;
   font-size: 12px;
   letter-spacing: 0.03em;
   text-transform: uppercase;

   color: #575A6D;
   padding: 0;
   margin-right: 10%;
 }
</style>
