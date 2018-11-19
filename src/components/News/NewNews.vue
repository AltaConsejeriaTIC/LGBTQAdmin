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
    name: 'NewNews',
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
        createNews: constants.NEWS_CREATE_NEWS
      }),
      save() {
        this.data.image = this.image;
        this.data.state = true;
        this.createNews(this.data);
        this.$router.go(-1);
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
        e.preventDefault();
        if(this.errors.length === 0)
          this.save();
      }
    }
  }
</script>

<style>

</style>
