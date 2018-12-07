<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="data.image"  :w="200" :h="200"  ref="imgContent"></ImageContent>
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
    import { mapActions, mapGetters } from 'vuex';
    import * as constants from '@/store/constants';
    import ImageContent from '../Image/ImageContent';

    var moment = require('moment');

    export default {
        name: "DetailAlliance",
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
          this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
        },
        computed: {
          ...mapGetters({
            get: constants.ALLIANCE_BY_ID
          })
        },
        methods: {
          ...mapActions({
            updateAlliance: constants.ALLIANCE_UPDATE
          }),
          async save() {
            this.$refs.imgContent.uploadImage();
            await this.updateAlliance(this.data);
            alert("ok");
            this.$router.push('/alliance');
          },
          checkForm(e) {
            this.errors = [];
            if (!this.data.name) {
              this.errors.push('Nombre es requerido.');
            }
            if (!this.data.description) {
              this.errors.push('Descripción es requerida.');
            }else{
              let lenDes = this.data.description.length;
              if( lenDes < 150 ||  lenDes > 300){
                this.errors.push('Tamaño de Descripción no permitido.Tamaño máximo 300 mínimo 150 caracteres.');
              }
            }
            if (!this.data.offer) {
              this.errors.push('Campo oferta es requerido.')
            }else{
              let lenOfer = this.data.offer.length;
              if( lenOfer < 300 ||  lenOfer > 700){
                this.errors.push('Tamaño de oferta no permitido.Tamaño máximo 700 mínimo 300 caracteres.');
              } 
            }                    
            if (!this.data.email) {
              this.errors.push('Campo Email es requerido.')
            }            
            if (this.data.finish_date === "Invalid date" || !this.data.finish_date ) {
              this.errors.push('Campo Fecha es requerido.')
            }                     
            e.preventDefault();
            if(this.errors.length === 0)
              this.save();
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
  .ui.grid {
    width: 80%;
  }
</style>
