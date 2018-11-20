<template>
  <div class="ui grid">
    <div class="five wide column">
      <croppa v-model="myCroppa"
              quality="1"
              width="300"
              height="300"
              prevent-white-space="true"
              show-remove-button="false">
          <img crossOrigin="anonymous" :src="api+image" slot="initial"></croppa>
      <button @click="generateImage">Generate</button>
      <br>
      <img class="output" :src="imgUrl" >
      <!-- <div v-if='show' class="ui medium image">
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
        <button
          class="fluid ui button"
          @click='changeImage'>
          <i class="edit icon"></i>
          Editar
        </button>
      </div>       -->
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
import Croppa from 'vue-croppa';

var moment = require('moment');

Vue.use(Croppa);

export default {
  name: 'DetailEvent',
  data() {
    return {
      data: {},
      image: '',
      api: ENV.ENDPOINT,
      errors: [],
      myCroppa: null,
      imgUrl: '',
      show:true,
      im: "http://localhost:8080/images/evento02.jpg"
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
    this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
    this.image = this.data.image;
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
      this.data.image = this.image;
      this.updateEvent(this.data);
      this.$router.push({ name: 'Dashboard' });
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
      console.log(this.errors);
      event.preventDefault();
      if(this.errors.length === 0)
        this.save(this.data);
    },
    generateImage: function() {
      let url = this.myCroppa.generateDataUrl()
      if (!url) {
      	alert('no image')
        return
      }
      this.imgUrl = url
    },
    changeImage: function(){
      this.show = !this.show
    }
  }
}
</script>

<style>
  .croppa-container {
    background-color: #409fdc;
    /* border: 3px solid black; */
    width: 60%;
    margin: auto;
  }
</style>
