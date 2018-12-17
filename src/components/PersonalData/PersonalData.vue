<template>
  <div>
    <div class="p-title text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right create text">Descargar</button>
    </div>
    <b-table hover stacked="lg"           :items="users"
            :fields="fields"             :head-variant="'light'"
            :current-page="currentPage"  :per-page="perPage"
            class="table text table-responsive-xl">
      <template slot="state" slot-scope="row">{{row.value?'Publicado':'No Publicado'}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->        
        <b-button class="actions" variant="light" @click.stop="viewUser(row.id)">Editar</b-button>
      </template>
    </b-table>  
      <b-pagination :total-rows="users.length" :per-page="perPage" v-model="currentPage" align="right"
                    :limit=1 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination> 
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as constants from '@/store/constants';

  import * as moment from 'moment';

  export default {
    name: 'PersonalData',
    data() {
      return {
        title: 'Datos personales',
        currentPage: 1,
        perPage: 5,
        fields: {
          id: {
            label: 'ID',
            sortable: true,
            class: 'id'
          },
          first_name: {
            label: 'NOMBRE',
            sorteable: true,
            class:'whit-space-pre',
            formatter: (value, key, item) => {
              return item.first_name + "\n" + item.last_name
            }
          },
          document_type: {
            label: 'TIPO DE D.I',
            sortable: false
          },
          document_number: {
            label: 'NÚMERO DEL D.I',
            sortable: true
          },
          education: {
            label: 'NIVEL EDUCATIVO'
          },
          birth_day: {
            label: 'FECHA DE NACIMIENTO',
            formatter: (value, key, item) => {
              return this.formatDate(item.birth_date)
            }
          },
          address: {
            label: 'DIRECIÓN'
          },
          phone: {
            label: 'TÉLEFONO O CELULAR'
          },
          email: {
            label: 'CORREO ELECTRÓNICO'
          },
          sex_birth: {
            label: 'SEXO DE NACIMIENTO'
          },
          sexual_orientation: {
            label: 'ORIENTACIÓN SEXUAL'
          },
          gender: {
            label: 'GÉNERO'
          }
        }
      }       
    },
     
    created() {
      if ( !this.users.length ){
        this.getData();
      }      
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
      },
      formatDate(date) {
        return moment(date).format('DD-MMM-YYYY');
      }
    }
  }
</script>

<style scoped>
  .p-title{
    margin: 20px 0;
    height: 44px;
  }
  .text{
    font-weight: bold;
    line-height: 18px;
    font-size: 14PX;
    font-style: normal;
    font-family: Nunito,Arial,monospace;
    color: #3F4150;
  }
   table.table{
    text-align: left;
    background-color: #fff;
    margin-top: 24px;
    margin-bottom: 0;
    height: auto;
    overflow-y: auto;
    min-height: 309px;
    max-height: 70%;
  }
  table.table td, table.table th{
    vertical-align: middle;
  }
  td:nth-child(3) {
    width: 113px;
  }
  td:nth-child(6) {
    width: 183px;
  }
  table.table tr{
    min-height: 43px;
  }
  thead{
    text-transform: uppercase;
  }
  .table .thead-light th{
    background-color: #F9FAFB;
    line-height: 14px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #7C7F92;
  }
  .table .id{
    vertical-align: middle;
    text-align: center;
  }
  tbody tr{
    font-weight: 800;
    line-height: 20px;
    font-size: 14px;
    color: #3F4150;
  }
  tbody tr.table-disable{
    font-weight: 600;
    color: #999BAA;
  }
  button.actions{
    height: 32px;
    width: 73px;
    background: #DFE0E1;
    border: 1px solid #CBCED0;
    box-sizing: border-box;
    border-radius: 4px;
    line-height: 20px;
    font-size: 13px;
    text-align: center;
  }
  button.actions:first-child{
    margin-bottom: 0;
    margin-right: 10px;
  }
  .white-space-pre {
    white-space: pre-wrap;
  }
  @media (max-width: 1100px){
    td:nth-child(6){
      width: unset;
    }
    button.actions:first-child{
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 992px) {
    td:nth-child(3){
      width: unset;
    }
    button.actions:first-child{
      margin-bottom: 0;
      margin-right: 7px;
    }
  }
  @media (max-width: 629px) {
    button.actions:first-child{
      margin-bottom: 10px;
    }
  }
</style>