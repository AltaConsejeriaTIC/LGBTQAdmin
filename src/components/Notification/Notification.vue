<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-block text">Enviar notificación push </h2>
    </div>
    <div class="container-fluid row">
      <b-form class="p-form col" @submit="checkForm">
        <b-form-group id="titleGroup" label="Título:" label-for="title">
          <b-form-input id="title" type="text" v-model="$v.data.title.$model"
                        placeholder="Título" :state="!$v.data.title.$error">
          </b-form-input>
          <p class="counter">{{countTitle + ' caracteres'}}</p>
          <b-form-invalid-feedback v-for="error in $v.data.title.$params" v-if="!$v.data.title[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
          <p>Máx. 20 caracteres</p>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="$v.data.description.$model"
                             placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true" :state="!$v.data.description.$error">
          </b-form-textarea>
          <p class="counter">{{countDescription + ' caracteres'}}</p>
          <b-form-invalid-feedback v-for="error in $v.data.description.$params" v-if="!$v.data.description[error.type]"  v-bind:key="error.type">
            {{errorMessages(error)}}
          </b-form-invalid-feedback>
          <p>Max. 50 caracteres</p>
        </b-form-group>
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Enviar</b-btn>
          </b-col>
        </b-form-row>

      </b-form>
      <b-modal ref="notificationCreated"
            ok-only
            hide-header
            ok-title="Aceptar"
            ok-variant="primary"
            class="mt-3"
            @ok="goHome">
            <div class="d-block text-center">
                <h4>Notificación enviada.</h4>
              </div>
      </b-modal>
      <b-modal ref="noCreated"
            ok-only
            hide-header
            ok-title="Aceptar"
            ok-variant="primary"
            class="mt-3"
            @ok="show=false">
            <div class="d-block text-center">
                <h4>No se pudo enviar notifcación.</h4>
              </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import {maxLength, required} from 'vuelidate/lib/validators'



export default {
  name: 'Notification',
  components: {},
  data() {
    return {
      data: {
        title: '',
        description: ''
      },
      image: '',//'/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errorMessages: constants.ERROR_MESSAGES
    }
  },
  validations: {
    data: {
      title: {
        required,
        maxLength: maxLength(20)
      },
      description: {
        required,
        maxLength: maxLength(50)
      }
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
  methods: {
    ...mapActions({
      sendNotification: constants.NOTIFICATION_SEND
    }),
    checkForm(event) {
      this.$v.$touch();
      event.preventDefault();
      if (!this.$v.$invalid) {
        this.sendNotification({
          "title": this.data.title,
          "body": this.data.description
        })
        .then(() => {          
          this.$refs.notificationCreated.show();
        })
        .catch(()=> this.$refs.noCreated.show())        
      }
    },
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/dashboard')
    },
    goHome() {
      this.$router.push({name: 'Home'})      
    }
  }
}
</script>

<style scoped>

p {
  color: #A8ABBA;
}
.p-form {
  text-align: left;
  font-style: normal;
  font-weight: 800;
  line-height: 1.4;
  font-size: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.counter{
  float: right;
}
#description{
  height: 143px;
}

  .row, .col-md-auto, .col-md-4{
    margin: 0;
    padding: 0;
  }

@media (max-width: 1010px) {
  .p-form{
    margin: 0;
  }

  .container-fluid.row{
    flex-direction: column-reverse;
  }

  .col{
    min-height: unset;
  }
}

</style>
