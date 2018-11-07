<template>
  <div class="ui grid">
    <div class="five wide column">
      <div class="ui medium image">
        <img :src="api+data.image">
      </div>
    </div>

    <div class="ten wide column">
      <form class="ui form">
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
        <button class="ui button" type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'DetailEvent',
  data() {
    return {
      data: {},
      api: 'http://192.168.88.54:8080'
    }
  },
  created(){
    let id = this.$route.params.id;
    Vue.axios
      .get(`/events/${id}`)
      .then(response => this.data=response.data)
      .catch((e) => console.log(e));
  }
}
</script>

<style>

</style>
