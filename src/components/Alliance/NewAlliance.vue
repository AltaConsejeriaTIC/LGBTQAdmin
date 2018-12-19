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
      save() {
        if(!this.data.phone){
          this.data.phone = "";
        }
        if(!this.data.website){
          this.data.website = "";
        }
        let nameImage = this.data.name.replace(/\s/g,"");
        this.data.image = `/images/alianza-${nameImage}.jpg`;
        this.$set(this.data,'state',true);
        this.$refs.imgContent.uploadImage(`alianza-${nameImage}.jpg`);
        this.createAlliance(this.data)
          .then( () => {
            alert(`Allianza fue creada exitosamente`);
            this.$router.push('/alliances');
          })
          .catch( () => alert("No se pudo crear"))        
      },
      checkForm(submit) {
        this.errors = [];
        if (!this.data.name) {
          this.errors.push('Nombre es requerido.');
        }else if (this.data.name.length > 45) {
          this.errors.push('El nombre puede contener máximo 45 caracteres.');                            
        }
        if (!this.data.description) {
          this.errors.push('Descripción es requerida.');
        }else{
          let lenDes = this.data.description.length;
          if( lenDes < 150 ||  lenDes > 300){
            this.errors.push('La descripción debe contener mínimo 150 y máximo 300 caracteres.');
          }
        }
        if (!this.data.offer) {
          this.errors.push('Campo oferta es requerido.')
        }else{
          let lenOfer = this.data.offer.length;
          if( lenOfer < 300 ||  lenOfer > 700){
            this.errors.push('La oferta debe contener mínimo 300 y máximo 700  caracteres.');
          } 
        }                    
        if (!this.data.email) {
          this.errors.push('Campo Email es requerido.')
        }else if (!this.validEmail(this.data.email)) {
          this.errors.push("Correo ingresado no es válido.")
        }
        if (this.data.phone && !this.validPhone(this.data.phone)) {
          this.errors.push("Teléfono ingresado no es válido.")
        }
        if (!this.data.finish_date){
          this.errors.push('Campo Fecha es requerido.')
        }else{
          let currentDate = new Date();
          let year = currentDate.getFullYear();
          let month = this.addZero(currentDate.getMonth()+1);
          let day = this.addZero(currentDate.getDate());
          currentDate = `${year}-${month}-${day}`;
          if ( this.data.finish_date < currentDate ){
            this.errors.push('La fecha debe ser igual o mayor al día de hoy.');
          }
        }
        submit.preventDefault();
        if(this.errors.length === 0)
          this.save();
      },
      validEmail( email ) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z-.]{2,}$/
        return regex.test(email);
      },
      validPhone( phone ) {
        let regex = /^([\(]?\+?[0-9]{1,3}[\)]?){0,2}[0-9\s]{7,20}((ext|ext\.|Ext|Ext\.){1}\s[0-9\s]{1,7})?$/
        return regex.test(phone)
      },
      addZero(number){
      if(number < 10){
        number = "0"+1;
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
  .ui.button.back {
    float: right;
  }
  .ui.grid {
    width: 80%;
  }
</style>
