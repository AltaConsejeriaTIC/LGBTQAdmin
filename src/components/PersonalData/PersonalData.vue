<template>
  <div>
    <div class="section">
      <div class="section-head">
        <div class="p-title">
          <div class="main-title">{{title}}</div>
          <div class="subtitle">respuestas usuarios</div>
        </div>
        <div class="down-exel">
          <div class="down-exel-icon">
            <download-excel
                  type="button"
                  class="btn btn-warning "
                  :data   = users>
                  <i class="fas fa-download"></i>
            </download-excel>
          </div>
          <div class="icon-text">Descargar la tabla de respuestas</div>
        </div>
      </div>
        <b-table hover stacked="lg"          :items="users"
                :fields="fields"             :head-variant="'light'"
                :current-page="currentPage"  :per-page="perPage"
                class="table text table-responsive-xl" id="tblData">
        </b-table>
          <b-pagination :total-rows="users.length" :per-page="perPage" v-model="currentPage" align="right"
                        :limit=3 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
    </div>
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
        perPage: 10,
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
            label: 'FECHA DE    NACIMIENTO ',
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
      formatDate(date) {
        return moment(date).format('DD-MMM-YYYY');
      },
      exportTableToExcel: function(tableID, filename = ''){
          var downloadLink;
          var dataType = 'application/vnd.ms-excel';
          var tableSelect = document.getElementById(tableID);
          var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

          // Specify file name
          filename = filename?filename+'.xls':'excel_data.xls';

          // Create download link element
          downloadLink = document.createElement("a");

          document.body.appendChild(downloadLink);

          if(navigator.msSaveOrOpenBlob){
              var blob = new Blob(['\ufeff', tableHTML], {
                  type: dataType
              });
              navigator.msSaveOrOpenBlob( blob, filename);
          }else{
              // Create a link to the file
              downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

              // Setting the file name
              downloadLink.download = filename;

              //triggering the function
              downloadLink.click();
          }
      }
    }
  }
</script>

<style scoped>

  .section {
    display: flex;
    flex-direction: column;
  }
  .section-head {
    display: flex;
    justify-content: space-between;
  }
  .p-title{
    display: flex;
    font-size: 24PX;
    font-weight: bold;
    color: #3F4150;
    flex-direction: column;
    justify-content: flex-start;
  }
  .subtitle{
    font-size: 24PX;
    line-height: 24px;
    font-weight: bold;
    color: #999BAA;
  }
 .down-exel {
    display: flex;
    width: 140px;
    color: #7C7F92;
    align-items: flex-end;
  }
  .icon-text {
    font-size: 10px;
    text-align: left;
    line-height: 12px;
    padding-left: 5px;
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
    overflow-y: auto;
    min-height: min-content;
    max-height: 70%;
  }
    /* table.table td, table.table th{
    vertical-align: middle;
  }
  td:nth-child(3) {
    width: 50px;
  }
  td:nth-child(6) {
    width: 18px;
  }
  td:nth-child(7) {
    width: 50px;
    white-space: nowrap;
  }
  table.table tr{
    min-height: 20px;
  }
  thead{
    text-transform: uppercase;
  }
  .table th{
    background-color: #F9FAFB !important;
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
  } */
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

  @media (max-width: 1724px){
    table.b-table.b-table-stacked-lg, table.b-table.b-table-stacked-lg > tbody, table.b-table.b-table-stacked-lg > tbody > tr, table.b-table.b-table-stacked-lg > tbody > tr > td, table.b-table.b-table-stacked-lg > tbody > tr > th, table.b-table.b-table-stacked-lg > caption {
      display: block;
    }
  }

</style>
