<template>
  <div>
    <div v-if="data">
      <div class="p-title text">
        <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
        <h2 class="d-inline float-left text">Agregar Alianza</h2>
      </div>
      <div class="container-fluid row">
        <b-form class="p-form col" @submit="checkForm">
          <b-form-group id="nameGroup" label="Nombre:" label-for="name">
            <b-form-input id="name" type="text" v-model="$v.data.name.$model"
                          placeholder="Nombre" :state="!$v.data.name.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.name.$params" v-if="!$v.data.name[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
            <p>Máx. 45 caracteres</p>
          </b-form-group>
          <b-form-group id="descriptionGroup" label="Descripción aliado:" label-for="description">
            <b-form-textarea  id="description" type="text" v-model="$v.data.description.$model"
                              placeholder="Descripción aliado" :rows="4" :max-rows="5"
                              v-bind:no-resize="true" :state="!$v.data.description.$error">
            </b-form-textarea>
            <b-form-invalid-feedback v-for="error in $v.data.description.$params" v-if="!$v.data.description[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
            <p>Mín. 150, Máx. 300 caracteres</p>
          </b-form-group>

          <b-form-group id="offerGroup" label="Oferta aliado:" label-for="offer">
            <b-form-textarea id="offer" type="text" v-model="$v.data.offer.$model"
                             placeholder="Oferta aliado" :rows="6" :max-rows="8"
                             v-bind:no-resize="true" :state="!$v.data.offer.$error">>
            </b-form-textarea>
            <b-form-invalid-feedback v-for="error in $v.data.offer.$params" v-if="!$v.data.offer[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
            <p>Mín. 300, Máx. 1000 caracteres</p>
          </b-form-group>

          <b-form-group id="websiteGroup" label="Sitio Web: (opcional)" label-for="website">
            <b-form-input id="website" type="text" v-model="$v.data.website.$model"
                          placeholder="Sitio Web" :state="!$v.data.website.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.website.$params" v-if="!$v.data.website[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="phoneGroup" label="Teléfono:" label-for="phone">
            <b-form-input id="phone" type="text" v-model="$v.data.phone.$model"
                          placeholder="(+57)(1) 1234567 ext. 12345" :state="!$v.data.phone.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.phone.$params" v-if="!$v.data.phone[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="emailGroup" label="Email:" label-for="email">
            <b-form-input id="email" type="text" v-model="$v.data.email.$model"
                          placeholder="Email" :state="!$v.data.email.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.email.$params" v-if="!$v.data.email[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="finish_dateGroup" label="Fecha de expiración:" label-for="finish_date">
            <b-form-input id="finish_date" type="date" v-model="$v.data.finish_date.$model"
                          placeholder="Fecha" :state="!$v.data.finish_date.$error">
            </b-form-input>
            <b-form-invalid-feedback v-for="error in $v.data.finish_date.$params" v-if="!$v.data.finish_date[error.type]"  v-bind:key="error.type">
              {{errorMessages(error)}}
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-row class="form-row float-right">
            <b-col>
              <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
            </b-col>
          </b-form-row>
        </b-form>
        <div class="col-12 col-md-auto" >
          <ImageContent :img="data.image" :w="400" :h="400" :ratio="'1:1'" ref="imgContent" class="image"></ImageContent>
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
    import {maxLength, minLength, required, email} from 'vuelidate/lib/validators'
    import moment from 'moment';

    export default {
        name: "DetailAlliance",
        components: {
          ImageContent
        },
        data() {
          return {
            data: {
              name: '',
              description: '',
              offer: '',
              website: '',
              phone: '',
              email: '',
              finish_date: ''
            },
            errorMessages: constants.ERROR_MESSAGES
          }
        },
        validations: {
        data: {
          name: {
            required,
            maxLength: maxLength(45)
          },
          description: {
            required,
            minLength: minLength(150),
            maxLength: maxLength(300)
          },
          offer: {
            required,
            minLength: minLength(300),
            maxLength: maxLength(1000)
          },
          email: {
            required,
            email
          },
          phone: {
            validatePhone: constants.validatePhone
          },
          finish_date: {
            required
          },
          website: {}
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
            delete this.data._rowVariant;
            this.updateAlliance(this.data)
              .then( () => {
                alert("Alianza fue actualizada exitosamente");
                this.$router.push('/alliances');
              })
              .catch( () => alert('No se pudo actualizar'))    
          },
          checkForm(event) {
            this.$v.$touch();
            event.preventDefault();
            if(!this.$v.$invalid) this.save();
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
