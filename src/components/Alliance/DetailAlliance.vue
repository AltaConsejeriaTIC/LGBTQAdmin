<template>
  <div>
    <div v-if="data">
      <div class="p-title text">
        <h2 class="d-inline float-left text">Editar Alianza</h2>
        <button type="button" class="btn btn-danger d-inline float-right create big text"  @click="goBack">Eliminar evento</button>
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
                              required placeholder="Descripción" :rows="4" :max-rows="5"
                              v-bind:no-resize="true">
            </b-form-textarea>
            <p>Mín. 150, Máx. 300 caracteres</p>
          </b-form-group>

          <b-form-group id="offerGroup" label="Oferta:" label-for="offer">
            <b-form-textarea id="offer" type="text" v-model="data.offer"
                          required placeholder="Oferta" :rows="6" :max-rows="8"
                          v-bind:no-resize="true"> 
            </b-form-textarea>
            <p>Mín. 300, Máx. 1000 caracteres</p>
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
          <b-form-group id="finish_dateGroup" label="Fecha:" label-for="finish_date">
            <b-form-input id="finish_date" type="date" v-model="data.finish_date"
                          required placeholder="Fecha">
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

        <div class="col-12 col-md-auto" >
          <ImageContent :img="data.image" :w="420" :h="336" ref="imgContent" class="image"></ImageContent>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Cargando ...</h2>
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
          if(typeof this.data === 'undefined'){
            this.getByID(id)
              .then( alliance => {
                this.data = alliance;
                this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
              })
          }else{
            this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
          }
          
        },
        computed: {
          ...mapGetters({
            get: constants.ALLIANCE_BY_ID
          })
        },
        methods: {
          ...mapActions({
            updateAlliance: constants.ALLIANCE_UPDATE,
            getByID: constants.ALLIANCE_CALL_BY_ID
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
  p {
    color: #A8ABBA;
  }
  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }
</style>
