<template>
  <div>
    <h2>Datos Personales</h2>   
    <table class="ui celled table">
      <thead>
        <tr>          
          <th>Número de Documento</th>
          <th>Correo</th>
          <th>Género</th>
        </tr>
      </thead>
       <tbody v-for="user in users" :key="user.id">
        <tr >
          <td>{{user.document_number}}</td>          
          <td>{{user.email}}</td>
          <td>{{user.gender}}</td>          
          <td >
            <div class="ui small button" @click="viewUser(user)" >
              <i class="external alternate icon"></i>
              Ver Detalle
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'PersonalData',
    created() {
      if( !this.users.length )
        this.getData();
    },   
    computed: {
      ...mapGetters({
        users: constants.USERS
      })
    },    
    methods: {
      ...mapActions({
        getData: constants.PERSONALDATA_GET_USERS
      }),
      viewUser(user){
        this.$router.push({ name: 'DetailUser', params: { id: user.id } });        
      }
    }
  }
</script>

<style scoped>
    
</style>