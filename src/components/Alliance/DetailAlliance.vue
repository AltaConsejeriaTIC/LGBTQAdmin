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
          <p>Máx. 45 caracteres</p>
          <label>Descripción</label>
          <textarea rows="8" v-model="data.description"></textarea>
          <p>Mín. 150, Máx. 300 caracteres</p>
        </div>
        <div class="field">
          <label>Oferta</label>
          <textarea rows="5" v-model="data.offer"></textarea>
          <p>Mín. 300, Máx. 1000 caracteres</p>
          <label>Sitio Web</label>
          <input type="text" v-model="data.website">
          <label>Teléfono</label>
          <input type="text" v-model="data.phone">
          <div class="phoneExamples">
            <p>Ejemplos de telefonos válidos:</p>
            <ul style="list-style: none;">
              <li>(+57)(1) 34545345 ext. 12345</li>
              <li>(1) 34545345 Ext 145</li>
              <li>+57 2 3454555</li>
              <li>3454555 ext 12</li>
            </ul>
          </div>
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
          save() {
            if(!this.data.phone){
              this.data.phone = "";
            }
            if(!this.data.website){
              this.data.website = "";
            }
            this.$refs.imgContent.uploadImage();
            this.updateAlliance(this.data)
              .then( () => {
                alert("Alianza fue actualizada exitosamente");
                this.$router.push('/alliances');
              })
              .catch( () => alert('No se pudo actualizar'))    
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
            if ( !this.data.finish_date ) {
              this.errors.push('Campo Fecha es requerido.')
            }
            if (this.data.phone && !this.validPhone(this.data.phone)) {
              this.errors.push("Teléfono ingresado no es válido.")
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
  .phoneExamples {
    color: #A8ABBA;
    text-align: left;
  }
</style>
