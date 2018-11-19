<template>
  <div class="ui grid">
    <div class="five wide column">
      <div class="ui medium image">
        <img :src="api+image">
        <input
          type="file"
          style="display: none"
          @change="uploadImage"
          ref="fileInput">
        <button
          class="fluid ui button"
          @click="$refs.fileInput.click()">
          <i class="edit icon"></i>
          Editar
        </button>
      </div>
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
          <label>Dirección</label>
          <input type="text" v-model="data.address">
        </div>
        <button class="ui button" type="submit" >Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import Vue from 'vue';

var moment = require('moment');

export default {
  name: 'NewEvent',
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
    save() {
      this.data.image = this.image;
      this.data.state = true;
      this.data.latitude = 78.25;
      this.data.longitude = 78.252;

      this.createEvent(this.data);
      this.$router.go(-1);
    },
    uploadImage(event){
      let img = event.target.files[0];
      const fd = new FormData();
      fd.append('file', img, img.name);
      Vue.axios
      .post(`/upload`, fd ,{
        onUploadProgress: uploadEvent => console.log('Upload Progress: ', Math.round(uploadEvent.loaded/uploadEvent.total * 100))
      })
      .then(response => this.image = `/images/${img.name}`)
      .catch((e) => console.log(e));
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
    }
  }
}
</script>

<style>

</style>
