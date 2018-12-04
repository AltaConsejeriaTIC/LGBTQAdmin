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
          <textarea rows="8" v-model="data.description"></textarea>
        </div>
        <div class="field">
          <label>Dirección</label>
          <textarea rows="5" v-model="data.offer"></textarea>
          <label>Sitio Web</label>
          <input type="text" v-model="data.website">
          <label>Teléfono</label>
          <input type="text" v-model="data.phone">
          <label>Email</label>
          <input type="text" v-model="data.email">
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
          this.data.finish_date = moment(this.data.finish_date).format('YYYY-MM-DD');
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
          async save() {
            this.$refs.imgContent.uploadImage();
            await this.updateOrganization(this.data);
            alert("ok");
            this.$router.push({ name: 'Dashboard',params: {component: "organizations" } });
          },
          checkForm(e) {
            this.errors = [];

            if (!this.data.name) {
              this.errors.push('Nombre es requerido.');
            }
            if (!this.data.description) {
              this.errors.push('Descripción es requerida.');
            }
            if (!this.data.email) {
              this.errors.push('Email es requerido.');
            }
            if (!this.data.phone) {
              this.errors.push('Teléfono es requerido.');
            }
            e.preventDefault();
            if(this.errors.length === 0)
              this.save();
          },
          goBack() {
            this.$router.push('/dashboard/organizations')
          }
        }
    }
</script>

<style scoped>

</style>
