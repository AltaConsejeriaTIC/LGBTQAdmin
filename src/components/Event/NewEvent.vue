<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="image" :w="350" :h="280" ref="imgContent"></ImageContent>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import ImageContent from '../Image/ImageContent';

var moment = require('moment');

export default {
  name: 'NewEvent',
  components: {
    ImageContent
  },
  data() {
    return {
      data: {},
      image: '/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  methods: {
    ...mapActions({
      createEvent: constants.EVENT_CREATE_EVENT
    }),
    async save() {
      this.data.image = `/images/evento-${this.data.title}.jpg`;
      this.data.state = true;
      this.data.latitude = !parseFloat( this.data.latitude )? 0 : parseFloat( this.data.latitude );
      this.data.longitude = !parseFloat( this.data.longitude ) ? 0 : parseFloat( this.data.longitude );
      this.$refs.imgContent.uploadImage(`evento-${this.data.title}.jpg`);
      await this.createEvent(this.data);
      this.$router.go(-1);
    },
    checkForm(event) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');
      }
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }
      if (!this.data.place) {
        this.errors.push('Lugar es requerido.');
      }
      if (!this.data.address) {
        this.errors.push('Dirección es requerida.');
      }
      event.preventDefault();
      if(this.errors.length === 0)
        this.save();
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
  .ui.grid {
    width: 80%;
  }
</style>
