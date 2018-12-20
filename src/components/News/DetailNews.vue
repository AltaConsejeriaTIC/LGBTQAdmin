<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-inline float-left text">Agregar Noticia</h2>
    </div>
    <div v-if="errors.length" class="p-errors">
      <b>Por favor corriga los siguientes errores:</b>
      <ul>
        <li v-for="error in errors" >{{ error }}</li>
      </ul>
    </div>
    <div class="container-fluid row">
      <b-form class="p-form col" @submit="checkForm">
        <b-form-group id="titleGroup" label="Título:" label-for="title">
          <b-form-input id="title" type="text" v-model="data.title"
                        required placeholder="Título">
          </b-form-input>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="data.description"
                            required placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true">
          </b-form-textarea>
        </b-form-group>

        <b-form-group id="sourceGroup" label="Fuente:" label-for="source">
          <b-form-input id="source" type="text" v-model="data.source"
                        required placeholder="Fuente">
          </b-form-input>
        </b-form-group>

        <b-form-group id="sourceLinkGroup" label="Link:" label-for="sourceLink">
          <b-form-input id="sourceLink" type="text" v-model="data.source_link"
                        required placeholder="Link">
          </b-form-input>
        </b-form-group>

        <b-form-group id="imageOwnerGroup" label="Crédito de la imagen:" label-for="imageOwner">
          <b-form-input id="imageOwner" type="text" v-model="data.image_owner"
                        required placeholder="Crédito de la imagen">
          </b-form-input>
        </b-form-group>
        <b-form-row class="form-row">
          <b-col>
            <b-btn type="button" class="btn btn-light d-inline big text" @click="goBack">Cancelar</b-btn>
          </b-col>
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
    save() {
      this.$refs.imgContent.uploadImage();
      this.updateNews(this.data)
        .then( () => {
          alert("Noticia actualizada exitosamente");
          this.$router.push('/news');
        })
        .catch( () => alert("No se pudo actualizar"))
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

<style scoped>
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
  
  p {
    color: #A8ABBA;
  }
  

  .p-form ::placeholder{
    font-weight: 600;
    line-height: 20px;
    font-size: 13px;
    letter-spacing: 0.01em;
    color: #A8ABBA;

  }

  input[type=text]{
    height: 40px;
  }

  #description{
    height: 143px;
  }

  .image{
    width: min-content;

  }

  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }

  .form-row button{
    width: 100%;
    margin-bottom: 15px;
  }

  .btn.big {
    height: 44px;
  }
  .btn-warning {
    width: 154px;
    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }
</style>
