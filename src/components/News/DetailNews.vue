<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="data.image"  :w="350" :h="280"  ref="imgContent"></ImageContent>
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
import * as constants from '@/store/constants';
import ImageContent from '../Image/ImageContent';
import Vue from 'vue';

var moment = require('moment');

export default {
  name: 'DetailNews',
  components: {
    ImageContent
  },
  data() {
    return {
      data: {},
      errors: []
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    this.data.date = moment(this.data.date).format('YYYY-MM-DD');
  },
  computed: {
    ...mapGetters({
      get: constants.NEWS_BY_ID
    })
  },
  methods: {
    ...mapActions({
      updateNews: constants.NEWS_UPDATE
    }),
    async save() {
      this.$refs.imgContent.uploadImage();
      await this.updateNews(this.data);
      alert("ok");
      this.$router.push('/news');
    },
    checkForm(event) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');
      }else{
        if (this.data.title.length > 82) {
          this.errors.push('El titulo puede contener máximo 82 caracteres.');
        }
      }
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }else{
        if (this.data.description.length > 1000) {
          this.errors.push('La descripción puede tener máximo 1000 caracteres.')
        }
      }
      if (!this.data.date) {
        this.errors.push('Fecha es requrida.')
      }else{
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = this.addZero(currentDate.getMonth()+1);
        let day = this.addZero(currentDate.getDate());
        currentDate = `${year}-${month}-${day}`
        if (this.data.date > currentDate ) {
          this.errors.push('La fecha no puede ser mayor a hoy.')
        }
      }
      event.preventDefault();
      if(this.errors.length === 0)
        this.save();
    },
    addZero( number ) {
      if (number < 10){
        number = "0" + number;
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
