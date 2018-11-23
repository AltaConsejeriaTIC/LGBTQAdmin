<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="data.image" ref="imgContent"></ImageContent>
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
import { mapActions, mapGetters } from 'vuex';
import ImageContent from '../Image/ImageContent'
import * as constants from '@/store/constants';
import * as ENV from '../../env';

var moment = require('moment');

export default {
  name: 'DetailEvent',
  components: {
    ImageContent
  },
  data() {
    return {
      data: {},
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
    this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
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
    async save() {
      this.$refs.imgContent.uploadImage();
      await this.updateEvent(this.data);
      this.$router.push({ name: 'Dashboard' });
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
