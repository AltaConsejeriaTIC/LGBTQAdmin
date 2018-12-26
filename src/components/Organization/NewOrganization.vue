<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-inline float-left text">Agregar Organización</h2>
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
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="data.description"
                             placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true">
          </b-form-textarea>
          <p>Mín. 200, Máx. 700 caracteres</p>
        </b-form-group>

        <b-form-group id="addressGroup" label="Dirección:" label-for="address">
          <b-form-input id="address" type="text" v-model="data.address"
                         placeholder="Dirección">
          </b-form-input>
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
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
          </b-col>
        </b-form-row>

      </b-form>

      <div class="col-12 col-md-auto" >
        <ImageContent :w="400" :h="400" ref="imgContent" class="image"></ImageContent>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import ImageContent from '../Image/ImageContent';

var hash = require('object-hash');

export default {
  name: "NewOrganization",
  components:{
    ImageContent
  },
  data() {
    return{
      data:{},
      image: '/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errors:[]
    }
  },
  methods:{
    ...mapActions({
      createOrganization: constants.ORGANIZATION_CREATE_ORGANIZATION
    }),
    save() {
      if(!this.data.address){
        this.data.address = "";
      }
      if(!this.data.website){
        this.data.website = "";
      }
      let hashImageName = hash( this.data.name.replace(/\s/g,"") );
      let nameImage = hashImageName;
      this.data.image = `/images/organizacion-${nameImage}.jpg`;
      this.data.deleted = false;
      this.$set(this.data,'state',true);
      this.$refs.imgContent.uploadImage(`organizacion-${nameImage}.jpg`)
        .then(() => {
          this.createOrganization(this.data)
          .then( () => {
            alert("Organización creada exitosamente")
            this.$router.push('/organizations');
          })
          .catch( () => alert("No se pudo crear") )
        });      
    },    
    checkForm(submit) {
      this.errors = [];

      if (!this.data.name) {
        this.errors.push('Nombre es requerido.');
      }else if(this.data.name.length > 45){
        this.errors.push('El nombre puede contener máximo 45 caracteres.');
      }
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }else{
        let lenDes = this.data.description.length
        if ( lenDes < 200 || lenDes > 700 ){
          this.errors.push('La descripción debe contener mínimo 200 y máximo 700 caracteres.');
        }
      }
      if (!this.data.email) {
        this.errors.push('Email es requerido.');
      }else if (!this.validateEmail(this.data.email)) {
        this.errors.push('Correo no válido.')
      }
      if (!this.data.phone) {
        this.errors.push('Teléfono es requerido.');
      }else if (!this.validatePhone(this.data.phone)) {
        this.errors.push('Teléfono no válido')
      }            
      submit.preventDefault();
      if(this.errors.length === 0)
        this.save();            
    },
    validateEmail( email ) {
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z-.]{2,}$/
      return regex.test(email);
    },
    validatePhone( phone ) {
      let regex = /^([\(]?\+?[0-9]{1,3}[\)]?){0,2}[0-9\s]{7,20}((ext|ext\.|Ext|Ext\.){1}\s[0-9\s]{1,7})?$/
      return regex.test(phone)
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

