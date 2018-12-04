<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="image"  :w="200" :h="200"  ref="imgContent"></ImageContent>
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
          <label>Nombre</label>
          <input type="text" v-model="data.name">
          <label>Descripción</label>
          <textarea rows="8" v-model="data.description"></textarea>
        </div>
        <div class="field">
          <label>Oferta</label>
          <textarea rows="5" v-model="data.offer"></textarea>
          <label>Sitio Web</label>
          <input type="text" v-model="data.website">
          <label>Teléfono</label>
          <input type="text" v-model="data.phone">
          <label>Email</label>
          <input type="email" v-model="data.email">
        </div>
        <div class="field">
          <label>Fecha: {{data.finish_date}}</label>
          <input type="date" v-model="data.finish_date">
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
  import { mapActions } from 'vuex';
  import * as constants from '@/store/constants';
  import ImageContent from '../Image/ImageContent';
  import * as ENV from '../../env';

  var moment = require('moment');

  export default {
    name: "NewAlliance",
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
        createAlliance: constants.ALLIANCE_CREATE_ALLIANCE
      }),
      async save() {
        this.data.image = `/images/alianza${this.data.name}.jpg`;
        this.data.state = true;
        this.$refs.imgContent.uploadImage(`alianza${this.data.name}.jpg`);
        await this.createAlliance(this.data);
        this.$router.push('/dashboard/alliances')
      },
      checkForm(e) {
        this.errors = [];

        if (!this.data.name) {
          this.errors.push('nombre es requerido.');
        }
        if (!this.data.description) {
          this.errors.push('Descripción es requerida.');
        }
        e.preventDefault();
        if(this.errors.length === 0)
          this.save();
      },
      goBack() {
        this.$router.push('/dashboard/alliances')
      }
    }
  }
</script>

<style>
  .ui.button.back {
    float: right;
  }
</style>
