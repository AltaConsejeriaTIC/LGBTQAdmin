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
          <textarea rows="8" v-model="data.description"></textarea>
        </div>
        <div class="field">
          <label>Fuente</label>
          <input type="text" v-model="data.source">
          <label>Link de la noticia</label>
          <input type="text" v-model="data.source_link">
          <label>Propietario de la imagen</label>
          <input type="text" v-model="data.image_owner">
        </div>
        <div class="field">
          <label>Fecha: {{data.date}}</label>
          <input type="date" v-model="data.date">
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
  name: 'DetailNews',
  data() {
    return {
      data: {},
      image: '',
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    this.data.date = moment(this.data.date).format('YYYY-MM-DD');
    this.image = this.data.image;
  },
  computed: {
    ...mapGetters({
      get: constants.NEWS_BY_ID
    })
  },
  methods: {
    ...mapActions({
      updateEvent: constants.NEWS_UPDATE
    }),
    save() {
      this.data.image = this.image;
      this.updateEvent(this.data);
      this.$router.push({ name: 'Dashboard' });
    },
    uploadImage(news){
      let img = news.target.files[0];
      const fd = new FormData();
      fd.append('file', img, img.name);
      Vue.axios
      .post(`/upload`, fd ,{
        onUploadProgress: uploadEvent => console.log('Upload Progress: ', Math.round(uploadEvent.loaded/uploadEvent.total * 100))
      })
      .then(response => this.image = `/images/${img.name}`)
      .catch((e) => console.log(e));
    },
    checkForm(e) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');
      }
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }
      console.log(this.errors);
      e.preventDefault();
      if(this.errors.length === 0)
        this.save(this.data);
    }
  }
}
</script>

<style>

</style>
