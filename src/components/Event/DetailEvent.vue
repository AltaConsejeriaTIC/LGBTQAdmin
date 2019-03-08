<template>
  <div>
    <div v-if="data">
      <div class="p-title text">
        <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
        <h2 class="d-block text">Agregar Evento </h2>
      </div>
      <div class="container-fluid row">
        <b-form class="p-form col" @submit="checkForm">
          <b-form-group id="titleGroup" label="Título:" label-for="title">
            <b-form-input id="title" type="text" v-model="$v.data.title.$model"
                          placeholder="Título" :state="!$v.data.title.$error">
            </b-form-input>
            <p class="counter">{{countTitle + ' caracteres'}}</p>
            <b-form-invalid-feedback v-for="error in $v.data.title.$params" v-if="!$v.data.title[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
            <p>Máx. 50 caracteres</p>
          </b-form-group>
          <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
            <b-form-textarea  id="description" type="text" v-model="$v.data.description.$model"
                              placeholder="Descripción" :rows="3" :max-rows="5"
                              v-bind:no-resize="true" :state="!$v.data.description.$error">
            </b-form-textarea>
            <p class="counter">{{countDescription + ' caracteres'}}</p>
            <b-form-invalid-feedback v-for="error in $v.data.description.$params" v-if="!$v.data.description[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
            <p>Mín. 150, Máx. 800 caracteres</p>
          </b-form-group>
          <b-form-row>
            <b-col>
              <b-form-group id="start_dateGroup" label="Fecha de inicio:" label-for="start_date">
                <b-form-input id="start_date" type="date" v-model="$v.data.start_date.$model" ref="startTimeInput"
                              placeholder="Fecha de inicio" :state="!$v.data.start_date.$error">
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.start_date.$params" v-if="!$v.data.start_date[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="finish_dateGroup" label="Fecha de fin:" label-for="finish_date">
                <b-form-input id="finish_date" type="date" v-model="$v.data.finish_date.$model"
                              placeholder="Fecha de fin" :state="!$v.data.finish_date.$error">
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.finish_date.$params" v-if="!$v.data.finish_date[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <b-form-group id="start_timeGroup" label="Hora de inicio:" label-for="start_time">
                <b-form-input id="start_time" type="time" v-model="$v.data.start_time.$model"
                              placeholder="Hora de inicio" :state="!$v.data.start_time.$error" >
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.start_time.$params" v-if="!$v.data.start_time[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="finish_timeGroup" label="Hora de fin:" label-for="finish_time">
                <b-form-input id="finish_time" type="time" v-model="$v.data.finish_time.$model"
                              placeholder="Hora de fin" :state="!$v.data.finish_time.$error">
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.finish_time.$params" v-if="!$v.data.finish_time[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <b-form-group id="latitudeGroup" label="Latitud: (opcional)" label-for="latitude">
                <b-form-input id="latitude" type="number" v-model="$v.data.latitude.$model"
                              placeholder="Latitud" :state="!$v.data.latitude.$error">
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.latitude.$params" v-if="!$v.data.latitude[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="longitudeGroup" label="Longitud: (opcional)" label-for="longitude">
                <b-form-input id="longitude" type="number" v-model="$v.data.longitude.$model"
                              placeholder="Longitud" :state="!$v.data.longitude.$error">
                </b-form-input>
                <b-form-invalid-feedback v-for="error in $v.data.longitude.$params" v-if="!$v.data.longitude[error.type]"  v-bind:key="error.type">
                  {{errorMessages(error)}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-group id="placeGroup" label="Lugar: (opcional)" label-for="place">
            <b-form-input id="place" type="text" v-model="$v.data.place.$model"
                          placeholder="Lugar" :state="!$v.data.place.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.place.$params" v-if="!$v.data.place[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="addressGroup" label="Dirección:" label-for="address">
            <b-form-input id="address" type="text" v-model="$v.data.address.$model"
                          placeholder="Dirección" :state="!$v.data.address.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.address.$params" v-if="!$v.data.address[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-row class="form-row float-right">
            <b-col>
              <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
            </b-col>
          </b-form-row>
        </b-form>
        <b-modal ref="updatedEvent"
                ok-only
                hide-header
                ok-title="Aceptar"
                ok-variant="primary"
                class="mt-3"
                @ok="goEvents()">
                <div class="d-block text-center">
                  <h4>Evento actualizado exitosamente.</h4>
                </div>
        </b-modal>
        <b-modal ref="noUpdatedEvent"
                ok-only
                hide-header
                ok-title="Aceptar"
                ok-variant="primary"
                class="mt-3"
                @ok="show=false">
                <div class="d-block text-center">
                  <h4>No se pudo actualizar.</h4>
                </div>
        </b-modal>
        <div class="col-12 col-md-auto" >
          <ImageContent :img="data.image" :w="420" :h="336" ref="imgContent" class="image" ></ImageContent>
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
import {maxLength, minLength, not, or, required} from 'vuelidate/lib/validators'

import moment from 'moment';

export default {
  name: 'DetailEvent',
  components: {
    ImageContent
  },
  data() {
    return {
      data: {
        title: '',
        description: '',
        start_date: '',
        finish_date: '',
        start_time: '',
        finish_time: '',
        latitude: 0,
        longitude: 0,
        place: '',
        address: ''
      },
      error: false,
      api: ENV.ENDPOINT,
      errorMessages: constants.ERROR_MESSAGES
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
  validations: {
    data: {
      title: {
        required,
        maxLength: maxLength(50)
      },
      description: {
        required,
        minLength: minLength(150),
        maxLength: maxLength(800)
      },
      start_date: {
        required
      },
      finish_date: {
        required,
        notBefore: constants.notBefore('start_date', "YYYY-MM-DD", "La fecha debe ser igual o mayor a la fecha de inicio")
      },
      start_time: {
        required,
        notBefore: constants.addMsg(or( not(constants.equalDates('start_date',new Date(),"YYYY-MM-DD")),
          constants.notBefore(new Date(), 'HH:mm')),"La hora debe ser mayor a la actual.")
      },
      finish_time: {
        required,
        notBefore: constants.addMsg(or( not(constants.equalDates('start_date', 'finish_date',"YYYY-MM-DD")),
          constants.notBefore('start_time', 'HH:mm')),"La hora de fin debe ser mayor a la hora de inicio.")
      },
      address: {
        required
      },
      latitude: {},
      longitude: {},
      place: {},
    }
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
          this.$refs.updatedEvent.show();
        })
        .catch( () => this.$refs.noUpdatedEvent.show())
    },
    checkForm(event) {
      this.$v.$touch();
      event.preventDefault();
      if(!this.$v.$invalid) this.save();
    },
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/dashboard')
    },
    goEvents() {
      this.$router.push('/events');

    },
    parseDate() {
      this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
      this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
      this.data.start_time = moment(this.data.start_time,"h:mm a").format('HH:MM');
      this.data.finish_time = moment(this.data.finish_time,"h:mm a").format('HH:MM');
    }
  },
  computed: {
    ...mapGetters({
      get: constants.EVENT_BY_ID
    }),
    countTitle() {
      return this.data.title.length
    },
    countDescription() {
      return this.data.description.length
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
 .counter {
    float: right;
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
