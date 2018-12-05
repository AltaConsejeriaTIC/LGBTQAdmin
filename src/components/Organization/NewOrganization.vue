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
    async save() {
      this.data.image = `/images/organization-${this.data.title}.jpg`;
      this.data.state = true;
      this.$refs.imgContent.uploadImage(`organizacion-${this.data.title}.jpg`);
      await this.createOrganization(this.data);
      this.$router.push('/dashboard/organizations');
    },
    checkForm(organization) {
      this.errors = [];

      if (!this.data.name) {
        this.errors.push('Nombre es requerido.');
      }
      if (!this.data.description) {
        this.errors.push('Descripción es requerida.');
      }
      if (!this.data.phone) {
        this.errors.push('Teléfono es requerido.');
      }
      if (!this.data.email) {
        this.errors.push('Email es requerido es requerida.');
      }
      organization.preventDefault();
      if(this.errors.length === 0)
        this.save();
    },
    goBack() {
      this.$router.push('/dashboard/organizations')
    }
  }

}
</script>


