<template>
  <div>
    <h2>Detalle Usuario</h2>
    <h3>Tipo de Documento</h3>
    <p>{{user.document_type}}</p>
    <h3>Número de Documento</h3>
    <p>{{user.document_number}}</p>
    <h3>Nombre</h3>
    <p>{{user.first_name}}</p>
    <h3>Apellido</h3>
    <p>{{user.last_name}}</p>
    <h3>Dirección</h3>
    <p>{{user.address}}</p>
    <h3>Correo</h3>
    <p>{{user.email}}</p>
    <h3>Teléfono</h3>
    <p>{{user.phone}}</p>
    <h3>Sexo de Nacimiento</h3>
    <p>{{user.sex_birth}}</p>
    <h3>Orientación Sexual</h3>
    <p>{{user.sexual_orientation}}</p>
    <h3>Género</h3>
    <p>{{user.gender}}</p>
    <h3>Fecha de Nacimiento</h3>
    <p>{{user.birth_day}}</p>
    <h3>Educación</h3>
    <p>{{user.education}}</p>
    <h3>Fecha en que se llenó el Formulario </h3>
    <p>{{formatDate(user.created_at)}}</p>    
  </div>  
</template>

<script>
import {mapGetters} from 'vuex';
import * as constants from '@/store/constants';

var moment = require('moment');

export default {
  name: 'DetailUser',
  data() {
    return {
      user: {}
    }
  },
  created() {
    let id = this.$route.params.id;
    this.user = this.getUser(id)
  },
  computed: {
    ...mapGetters({
      getUser: constants.PERSONALDATA_BY_ID
    })
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MMMM-DD');
    }
  }
}
</script>

<style scoped>

</style>

