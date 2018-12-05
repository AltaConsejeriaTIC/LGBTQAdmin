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
  import ImageContent from '../Image/ImageContent';

  var moment = require('moment');

  export default {
    name: 'NewNews',
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
        createNews: constants.NEWS_CREATE_NEWS
      }),
      async save() {
        this.data.image = `/images/noticia-${this.data.title}.jpg`;
        this.data.state = true;
        this.$refs.imgContent.uploadImage(`noticia-${this.data.title}.jpg`);
        await this.createNews(this.data);
        this.$router.push('/dashboard/news');
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
      },
      goBack() {
        this.$router.push('/dashboard/news')
      }
    }
  }
</script>

<style>
  .ui.grid {
    width: 80%;
  }
</style>
