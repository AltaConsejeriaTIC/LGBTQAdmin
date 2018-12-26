<template>
  <div>
    <div class="p-title text">
      <a class="d-block p-link" href="#" @click="goBack"><i class="fas fa-angle-left"></i>Regresar</a>
      <h2 class="d-block text">Enviar notificación push </h2>
    </div>
    <div v-if="errors.length" class="p-errors">
      <b>Por favor corriga los siguientes errores:</b>
      <ul>
        <li v-for="error in errors" >{{ error }}</li>
      </ul>
    </div>
    <div class="container-fluid row">
      <b-form class="p-form col" @submit="checkForm">
        <b-form-group id="titleGroup" label="Título:" label-for="title">
          <b-form-input id="title" type="text" v-model="data.title"
                         placeholder="Título" formnovalidate>
          </b-form-input>
          <p>Máx. 20 caracteres</p>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Descripción:" label-for="description">
          <b-form-textarea  id="description" type="text" v-model="data.description"
                             placeholder="Descripción" :rows="3" :max-rows="5"
                            v-bind:no-resize="true">
          </b-form-textarea>
          <p>Max. 50 caracteres</p>
        </b-form-group>
        <b-form-row class="form-row float-right">
          <b-col>
            <b-btn type="submit" class="btn btn-warning d-inline big text">Enviar</b-btn>
          </b-col>
        </b-form-row>

      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import * as constants from '@/store/constants';
import * as ENV from '../../env';
import ImageContent from '../Image/ImageContent';



export default {
  name: 'Notification',
  components: {},
  data() {
    return {
      data: {},
      image: '',//'/images/ImagePlaceholder.png',
      api: ENV.ENDPOINT,
      errors: []
    }
  },
  created(){
    if(!this.data.place){
      this.data.place = "";
    }
  },
  methods: {
    ...mapActions({
      sendNotification: constants.NOTIFICATION_SEND
    }),
    checkForm(event) {
      this.errors = [];

      if (!this.data.title) {
        this.errors.push('Título es requerido.');
      }
      else if(this.data.title.length>20){
        this.errors.push('Título no válido. Tamaño máximo del título 20 caracteres.');

      }

      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }
      else if(this.data.description.length>50){
        this.errors.push('Descripción no válida. Tamaño máximo de la descripción 50 caracteres.');
      }

      event.preventDefault();
      if (this.errors.length === 0)
        this.sendNotification({
          "title": this.data.title,
          "body": this.data.description
        });
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
.p-form {
  text-align: left;
  font-style: normal;
  font-weight: 800;
  line-height: 1.4;
  font-size: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
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
