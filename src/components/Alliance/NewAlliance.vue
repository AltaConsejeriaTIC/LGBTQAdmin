<template>
  <div>
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
          <p class="counter">{{countName  + ' caracteres'}}</p>
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
          <p class="counter">{{countDescription + ' caracteres'}}</p>
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
          <p class="counter">{{countOffer + ' caracteres'}}</p>
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
      <b-modal ref="allianceCreated"
              ok-only
              hide-header
              ok-title="Aceptar"
              ok-variant="primary"
              class="mt-3"
              @ok="goAlliances">
              <div class="d-block text-center">
                  <h4>Allianza creada exitosamente.</h4>
                </div>
      </b-modal>
      <b-modal ref="noAllianceCreated"
              ok-only
              hide-header
              ok-title="Aceptar"
              ok-variant="primary"
              class="mt-3"
              @ok="show=false">
              <div class="d-block text-center">
                  <h4>No se pudo crear.</h4>
                </div>
      </b-modal>

      <div class="col-12 col-md-auto" >
        <ImageContent :w="400" :h="400" :ratio="'1:1'" ref="imgContent" class="image"></ImageContent>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import * as constants from '@/store/constants';
  import ImageContent from '../Image/ImageContent';
  import * as ENV from '../../env';

  import hash from 'object-hash';
  import {maxLength, minLength, required, email} from 'vuelidate/lib/validators'

  export default {
    name: "NewAlliance",
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
        api: ENV.ENDPOINT,
        errorMessages: constants.ERROR_MESSAGES
      }
    },
    computed: {
      countName() {
        return this.data.name.length;
      },
      countDescription() {
        return this.data.description.length;
      },
      countOffer() {
        return this.data.offer.length;
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
          required,
          notBefore: constants.notBefore(new Date(), "YYYY-MM-DD","La fecha debe ser igual o mayor a la fecha de hoy")
        },
        website: {}
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
        let nameImage = hash(this.data.name.replace(/\s/g, ""));
        this.data.image = `/images/alianza-${nameImage}.jpg`;
        this.$set(this.data,'state',true);
        this.$refs.imgContent.uploadImage(`alianza-${nameImage}.jpg`)
          .then(() => {
            this.createAlliance(this.data)
            .then( () => {
              this.$refs.allianceCreated.show();
            })
            .catch( () => this.$refs.noAllianceCreated.show())
          })
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
      },
      goAlliances() {
        this.$router.push('/alliances');
      },
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
  .counter{
    float: right;
  }
</style>
