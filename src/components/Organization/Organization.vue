<template>
  <div v-resize="handleResize">
    <div class="p-title .text">
      <h2 class="d-inline float-left text">{{title}}</h2>
      <button type="button" class="btn btn-warning d-inline float-right big text" @click="newOrganization">Agregar Organización</button>
    </div>
    
        
    
    <div v-if="thereAreOrganizations">
      <b-table hover stacked="lg"           :items="organizations"
               :fields="fields"             :head-variant="'light'"
               :current-page="currentPage"  :per-page="perPage"
               class="table text table-responsive-xl" ref="actionsRow">
        <template slot="state" slot-scope="row">{{row.value?'Publicado':'No Publicado'}}</template>
        <template slot="actions" slot-scope="row">
          <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
          <b-button class="actions" variant="light" @click.stop="changeState(row.item)">{{row.item.state ? "Ocultar" : "Publicar" }}</b-button>
          <b-button class="actions" variant="light" @click.stop="editOrganization(row.item.id)">Editar</b-button>
          <b-button class="actions" variant="danger" @click.stop="deleteItem(row.item)">Eliminar</b-button>
        </template>        
      </b-table>
      <b-pagination :total-rows="organizations.length" :per-page="perPage" v-model="currentPage" align="right"
                    :limit=5 v-bind:hide-goto-end-buttons="true" next-text="Siguiente" prev-text="Anterior"></b-pagination>
      <b-modal ref="deleteModal"
               title="Eliminar organización"
               ok-title="Eliminar"
               cancel-title="Cancelar"
               ok-variant="danger"
               @ok="deleteOrganization(organizationToDelete)">
        ¿Desea eliminar la organización? Esta acción no se puede deshacer.
      </b-modal>
    </div>
    <div v-else>
      <h3>No hay Organizaciones Vigentes</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';

export default {
    name: "Organization",
    data() {
      return {
        title: "Organizaciones",
        organizationToDelete: {},
        currentPage: 1,
        perPage: 5,
        fields: {
          id: {
            label: 'ID',
            sortable: true,
            class: 'id'
          },
          name: {
            label: 'Nombre',
            sortable: true
          },
          website: {
            label: 'Sitio web'
          },
          state: {
            label: 'Estado'
          },
          actions: {
            class: 'p-actions',
            label: 'Acciones'
          }
        }
      }
    },
    created() {
      if ( !this.organizations.length )
        this.getOrganizations()
      this.organizations.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');

    },
    computed: {
      ...mapGetters({
        organizations: constants.ORGANIZATIONS
      }),
      thereAreOrganizations() {
        return this.organizations.length
      }
    },
    methods: {
      ...mapActions({
        getOrganizations: constants.ORGANIZATION_GET_ORGANIZATIONS,
        changeStateOrganization: constants.ORGANIZATION_CHANGE_STATE,
        deleteOrganization: constants.ORGANIZATION_DELETE_ORGANIZATION
      }),
      deleteItem(organization){        
        this.organizationToDelete = organization;
        this.$refs.deleteModal.show();        
      },      
      editOrganization(organizationId){
        this.$router.push({ name: 'DetailOrganization', params: { id: organizationId } });
      },
      changeState(organization) {
        this.changeStateOrganization(organization);
        this.organizations.forEach(item => item['_rowVariant'] = item.state ? 'actives' : 'disable');
      },
      newOrganization() {
        this.$router.push({ name: 'NewOrganization' });
      },
      handleResize() {
        if(this.organizations.length !== 0){
          let rowHeight = 140;
          if(this.$refs.actionsRow.$el && this.$refs.actionsRow.$el.children[1] && this.$refs.actionsRow.$el.children[1].children[0]){
            rowHeight = this.$refs.actionsRow.$el.children[1].children[0].offsetHeight;
          }
          this.perPage = window.innerWidth > 992 ? Math.ceil((window.innerHeight-320)/rowHeight)-1 : 5;
        }
      }
    }
}
</script>

<style scoped>
  .organization {
    width: 85%;
  }

  .btn-warning {
    width: 170px;
    font-weight: bold;
    line-height: 21px;
    border: 1px solid #E0AE0D;
    color: #161824;
  }
</style>
