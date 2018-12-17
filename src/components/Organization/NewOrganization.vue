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
          <textarea rows="5" v-model="data.description"></textarea>
        </div>
        <div>
          <div class="ui two column grid">
            <div class="row">
              <div class="column">
                <div class="field">
                  <label>Dirección</label>
                  <input type="text" v-model="data.address">
                  <label>Sitio Web</label>
                  <input type="text" v-model="data.website">
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label>Teléfono</label>
                  <input type="text" v-model="data.phone">
                  <label>Email</label>
                  <input type="email" v-model="data.email">
                </div>
              </div>
            </div>
          </div>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import ImageContent from '../Image/ImageContent';

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
      let nameImage = this.data.name.replace(/\s/g,"");
      this.data.image = `/images/organizacion-${nameImage}.jpg`;
      this.data.state = true;
      this.$refs.imgContent.uploadImage(`organizacion-${nameImage}.jpg`);
      this.createOrganization(this.data)
        .then( () => {
          alert("Organización creada exitosamente")
          this.$router.push('/organizations');
        })
        .catch( () => alert("No se pudo crear") );
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
      let regex = /^([\(]?\+[0-9]{1,3}[\)]?)?[0-9\s]{7,20}$/
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


