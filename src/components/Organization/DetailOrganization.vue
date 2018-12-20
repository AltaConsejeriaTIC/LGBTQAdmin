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
                        required placeholder="Nombre">
          </b-form-input>
          <p>Máx. 45 caracteres</p>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="data.description"
                            required placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true">
          </b-form-textarea>
          <p>Mín. 200, Máx. 700 caracteres</p>
        </b-form-group>

        <b-form-group id="addressGroup" label="Dirección:" label-for="address">
          <b-form-input id="address" type="text" v-model="data.address"
                        required placeholder="Dirección">
          </b-form-input>
        </b-form-group>

        <b-form-group id="websiteGroup" label="Sitio Web:" label-for="website">
          <b-form-input id="website" type="text" v-model="data.website"
                        required placeholder="Sitio Web">
          </b-form-input>
        </b-form-group>

        <b-form-group id="phoneGroup" label="Teléfono:" label-for="phone">
          <b-form-input id="phone" type="text" v-model="data.phone"
                        required placeholder="(+57)(1) 1234567 ext. 12345">
          </b-form-input>
        </b-form-group>

        <b-form-group id="emailGroup" label="Email:" label-for="email">
          <b-form-input id="email" type="text" v-model="data.email"
                        required placeholder="Email">
          </b-form-input>
        </b-form-group>
        <b-form-row class="form-row">
          <b-col>
            <b-btn type="button" class="btn btn-light d-inline big text" @click="goBack">Cancelar</b-btn>
          </b-col>
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
          </b-col>
        </b-form-row>

      </b-form>

      <!--<div class="col-12 col-md-auto" >-->
        <!--<ImageContent :w="420" :h="336" ref="imgContent" class="image"></ImageContent>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as constants from '@/store/constants';
    import ImageContent from '../Image/ImageContent';

    var moment = require('moment');

    export default {
        name: "DetailOrganization",
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
        },
        computed: {
          ...mapGetters({
            get: constants.ORGANIZATION_BY_ID
          })
        },
        methods: {
          ...mapActions({
            updateOrganization: constants.ORGANIZATION_UPDATE
          }),
          save() {
            if(!this.data.address){
              this.data.address = "";
            }
            if(!this.data.website){
              this.data.website = "";
            }
            this.$refs.imgContent.uploadImage();
            this.updateOrganization(this.data)
              .then( () => {
                alert("Organización actualizada exitosamente");
                this.$router.push('/organizations');
              })
              .catch( () => alert("No se pudo actualizar"));
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
  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }
</style>
