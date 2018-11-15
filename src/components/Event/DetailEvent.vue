<template>
  <div class="ui grid">
    <div class="five wide column">
      <div class="ui medium image">
        <img :src="api+data.image">
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
      <form class="ui form" @submit.prevent="save">
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
  name: 'DetailEvent',
  data() {
    return {
      data: {},
      api: ENV.ENDPOINT
    }
  },
  created() {
    let id = this.$route.params.id;
    this.data = this.get(id);
    console.log(this.data);
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
    save() {
      this.updateEvent(this.data);
      this.$router.push({ name: 'Dashboard' });
    },
    uploadImage(event){
      console.log(event);
      let img = event.target.files[0];
      console.log("-------",img.name);

      const fd = new FormData();
      fd.append('file', img, img.name);
      Vue.axios
      .post(`/upload`, fd)
      .then(response => {
        console.log(response)
        this.data.image = `/images/${img.name}`;
        })
      .catch((e) => console.log(e));
    }
  }
}
</script>

<style>

</style>
