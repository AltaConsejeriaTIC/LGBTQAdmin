<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-inline float-left text">Agregar Noticia</h2>
    </div>
    <div class="container-fluid row">
      <b-form class="p-form col" @submit="checkForm">
        <b-form-group id="titleGroup" label="Título:" label-for="title">
          <b-form-input id="title" type="text" v-model="$v.data.title.$model"
                         placeholder="Título" :state="!$v.data.title.$error">
          </b-form-input>
          <p class="counter">{{countTitle}}</p>
          <b-form-invalid-feedback v-for="error in $v.data.title.$params" v-if="!$v.data.title[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
          <p>Máx. 82 caracteres</p>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="$v.data.description.$model"
                             placeholder="Descripción" :rows="4" :max-rows="6"
                            v-bind:no-resize="true" :state="!$v.data.description.$error">
          </b-form-textarea>
          <p class="counter">{{countDescription}}</p>
          <b-form-invalid-feedback v-for="error in $v.data.description.$params" v-if="!$v.data.description[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
          <p>Máx. 1000 caracteres</p>
        </b-form-group>

        <b-form-group id="sourceGroup" label="Fuente:  (opcional)" label-for="source">
          <b-form-input id="source" type="text" v-model="$v.data.source.$model"
                         placeholder="Fuente" :state="!$v.data.source.$error">
          </b-form-input>
          <b-form-invalid-feedback v-for="error in $v.data.source.$params" v-if="!$v.data.source[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="sourceLinkGroup" label="Link: (opcional)" label-for="sourceLink">
          <b-form-input id="sourceLink" type="text" v-model="$v.data.source_link.$model"
                         placeholder="Link" :state="!$v.data.source_link.$error">
          </b-form-input>
          <b-form-invalid-feedback v-for="error in $v.data.source_link.$params" v-if="!$v.data.source_link[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="imageOwnerGroup" label="Crédito de la imagen: (opcional)" label-for="imageOwner">
          <b-form-input id="imageOwner" type="text" v-model="$v.data.image_owner.$model"
                         placeholder="Crédito de la imagen" :state="!$v.data.image_owner.$error">
          </b-form-input>
          <b-form-invalid-feedback v-for="error in $v.data.image_owner.$params" v-if="!$v.data.image_owner[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Publicar</b-btn>
          </b-col>
        </b-form-row>
      </b-form>
      <b-modal ref="newsCreated"
              ok-only
              hide-header
              ok-title="Aceptar"
              ok-variant="primary"
              class="mt-3"
              @ok="goNews">
              <div class="d-block text-center">
                  <h4>Noticia creada exitosamente.</h4>
                </div>
      </b-modal>
      <b-modal ref="noNewsCreated"
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
        <ImageContent :w="420" :h="336" ref="imgContent" class="image"></ImageContent>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import * as constants from '@/store/constants';
  import * as ENV from '../../env';
  import ImageContent from '../Image/ImageContent';
  import {maxLength, required} from 'vuelidate/lib/validators'


  import hash from 'object-hash';

  export default {
    name: 'NewNews',
    components: {
      ImageContent
    },
    data() {
      return {
        data: {
          title: '',
          description: '',
          source: '',
          source_link: '',
          image_owner: '',
        },
        api: ENV.ENDPOINT,
        errorMessages: constants.ERROR_MESSAGES
      }
    },
    computed: {
      countTitle() {
        return this.data.title.length
      },
      countDescription() {
        return this.data.description.length
      }
    },
    validations: {
      data: {
        title: {
          required,
          maxLength: maxLength(82)
        },
        description: {
          required,
          maxLength: maxLength(1000)
        },
        source: {},
        source_link: {},
        image_owner: {},
      }
    },
    methods: {
      ...mapActions({
        createNews: constants.NEWS_CREATE_NEWS
      }),
      save() {
        if (!this.data.source) {
          this.data.source = "";
        }
        if (!this.data.source_link) {
          this.data.source_link = "";
        }
        if (!this.data.image_owner) {
          this.data.image_owner = "";
        }
        this.data.date = new Date().toISOString().split('T')[0];
        let nameImage = hash(this.data.title.replace(/\s/g, ""));
        this.data.image = `/images/noticia-${nameImage}.jpg`;
        this.$set(this.data,'state',true);
        this.$refs.imgContent.uploadImage(`noticia-${nameImage}.jpg`)
          .then(() => {
            this.createNews(this.data)
              .then( () =>  {
                this.$refs.newsCreated.show();
              })
              .catch( () => this.$refs.noNewsCreated.show());
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
      }
    }
  }
</script>

<style scoped>
  .p-form {
    text-align: left;
    font-style: normal;
    font-weight: 800;
    line-height: 1.4;
    font-size: 12px;
    letter-spacing: 0.03em;
    text-transform: uppercase;

    color: #575A6D;
    padding: 0;
    margin-right: 10%;
  }

  p {
    color: #A8ABBA;
  }


  .p-form ::placeholder{
    font-weight: 600;
    line-height: 20px;
    font-size: 13px;
    letter-spacing: 0.01em;
    color: #A8ABBA;

  }
  .counter{    
    float: right;
  }

  input[type=text]{
    height: 40px;
  }

  #description{
    height: 143px;
  }

  .image{
    width: min-content;

  }

  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }

  .form-row button{
    width: 100%;
    margin-bottom: 15px;
  }

  .btn.big {
    height: 44px;
  }

  .btn-warning {
    width: 154px;
    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }
</style>
