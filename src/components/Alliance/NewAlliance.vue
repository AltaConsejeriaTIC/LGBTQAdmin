<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-inline float-left text">Agregar Alianza</h2>
    </div>
    <div v-if="errors.length" class="p-errors">
      <b>Por favor corriga los siguientes errores:</b>
      <ul>
        <li v-for="error in errors" >{{ error }}</li>
      </ul>
    </div>
    <div class="container-fluid row">
      <b-form class="p-form col" @submit="checkForm">
        <b-form-group id="nameGroup" label="Nombre:" label-for="name">
          <b-form-input id="name" type="text" v-model="data.name"
                         placeholder="Nombre">
          </b-form-input>
          <p>Máx. 45 caracteres</p>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción aliado:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="data.description"
                             placeholder="Descripción aliado" :rows="4" :max-rows="5"
                            v-bind:no-resize="true">
          </b-form-textarea>
          <p>Mín. 150, Máx. 300 caracteres</p>
        </b-form-group>

        <b-form-group id="offerGroup" label="Oferta aliado:" label-for="offer">
          <b-form-textarea id="offer" type="text" v-model="data.offer"
                         placeholder="Oferta aliado" :rows="6" :max-rows="8"
                        v-bind:no-resize="true">
          </b-form-textarea>
          <p>Mín. 300, Máx. 1000 caracteres</p>
        </b-form-group>

        <b-form-group id="websiteGroup" label="Sitio Web:" label-for="website">
          <b-form-input id="website" type="text" v-model="data.website"
                         placeholder="Sitio Web">
          </b-form-input>
        </b-form-group>

        <b-form-group id="phoneGroup" label="Teléfono:" label-for="phone">
          <b-form-input id="phone" type="text" v-model="data.phone"
                         placeholder="(+57)(1) 1234567 ext. 12345">
          </b-form-input>
        </b-form-group>

        <b-form-group id="emailGroup" label="Email:" label-for="email">
          <b-form-input id="email" type="text" v-model="data.email"
                         placeholder="Email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="finish_dateGroup" label="Fecha de expiración:" label-for="finish_date">
          <b-form-input id="finish_date" type="date" v-model="data.finish_date"
                         placeholder="Fecha">
          </b-form-input>
        </b-form-group>
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
          </b-col>
        </b-form-row>

      </b-form>

      <div class="col-12 col-md-auto" >
        <ImageContent :w="400" :h="400" :ratio="'1:1'" ref="imgContent" class="image"></ImageContent>
      </div>


    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import * as constants from '@/store/constants';
  import ImageContent from '../Image/ImageContent';
  import * as ENV from '../../env';

  var moment = require('moment');
  var hash = require('object-hash');

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
        let hashImageName = hash( this.data.name.replace(/\s/g,"") );
        let nameImage = hashImageName;
        this.data.image = `/images/alianza-${nameImage}.jpg`;
        this.$set(this.data,'state',true);
        this.$refs.imgContent.uploadImage(`alianza-${nameImage}.jpg`)
          .then(() => {
            this.createAlliance(this.data)
            .then( () => {
              alert(`Allianza fue creada exitosamente`);
              this.$router.push('/alliances');
            })
            .catch( () => alert("No se pudo crear"))
          })
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
          if( lenOfer < 300 ||  lenOfer > 1000){
            this.errors.push('La oferta debe contener mínimo 300 y máximo 1000  caracteres.');
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
  p {
    color: #A8ABBA;
  }
  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }
</style>
