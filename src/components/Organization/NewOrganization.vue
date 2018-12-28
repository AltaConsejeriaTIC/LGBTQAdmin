<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-inline float-left text">Agregar Organización</h2>
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
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="$v.data.description.$model"
                             placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true" :state="!$v.data.description.$error">
          </b-form-textarea>
          <b-form-invalid-feedback v-for="error in $v.data.description.$params" v-if="!$v.data.description[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
          <p>Mín. 200, Máx. 700 caracteres</p>
        </b-form-group>

        <b-form-group id="addressGroup" label="Dirección: (opcional)" label-for="address">
          <b-form-input id="address" type="text" v-model="$v.data.address.$model"
                         placeholder="Dirección" :state="!$v.data.address.$error">
          </b-form-input>
          <b-form-invalid-feedback v-for="error in $v.data.address.$params" v-if="!$v.data.address[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
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
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
          </b-col>
        </b-form-row>
      </b-form>

      <b-modal ref="organizationCreated"
              ok-only
              hide-header
              ok-title="Aceptar"
              ok-variant="primary"
              class="mt-3"
              @ok="goOrganization">
              <div class="d-block text-center">
                  <h4>Organización creada exitosamente.</h4>
                </div>
      </b-modal>
      <b-modal ref="noOrganizationCreated"
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
  import * as ENV from '../../env';
  import ImageContent from '../Image/ImageContent';

  import hash from 'object-hash';
  import {email, maxLength, minLength, required} from 'vuelidate/lib/validators'

  export default {
  name: "NewOrganization",
  components:{
    ImageContent
  },
  data() {
    return{
      data: {
        name: '',
        description: '',
        address: '',
        website: '',
        phone: '',
        email: ''
      },
      api: ENV.ENDPOINT,
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
        minLength: minLength(200),
        maxLength: maxLength(700)
      },
      address: {},
      email: {
        required,
        email
      },
      phone: {
        required,
        validatePhone: constants.validatePhone
      },
      website: {}
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
      let nameImage = hash(this.data.name.replace(/\s/g, ""));
      this.data.image = `/images/organizacion-${nameImage}.jpg`;
      this.data.deleted = false;
      this.$set(this.data,'state',true);
      this.$refs.imgContent.uploadImage(`organizacion-${nameImage}.jpg`)
        .then(() => {
          this.createOrganization(this.data)
          .then( () => {
            alert("Organización creada exitosamente");
            this.$router.push('/organizations');
          })
          .catch( () => alert("No se pudo crear") )
        });
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
    goOrganization() {
      this.$router.push('/organizations');
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
</style>

