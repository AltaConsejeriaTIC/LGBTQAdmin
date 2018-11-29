<template>
  <div>
    <button class="ui button" @click="newOrganization">Crear Organización </button>
    <h2>{{title}}</h2>
    <table class="ui celled table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Sitio Web</th>
        <th>Estado</th>
      </tr>
      </thead>
      <tbody v-for="organization in organizations" :key="organization.id">
      <tr >
        <td>{{organization.id}}</td>
        <td :class="{disabled: !organization.state}">{{organization.name}}</td>
        <td>{{organization.website}}</td>
        <td>{{organization.state ? "Publicado" : "No Publicado" }}</td>
        <td >
          <div class="ui small button" @click="changeStateOrganization(organization)">
            {{organization.state ? "Ocultar" : "Publicar" }}
          </div>
        </td>
        <td >
          <div class="ui small button" @click="editOrganization(organization.id)" >
            <i class="edit icon"></i>
            Editar
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
    name: "Organization",
    data() {
      return {
        title: "Organizaciones"
      }
    },
    created() {
      if ( !this.organizations.length )
        this.getOrganizations()
    },
    computed: {
      ...mapGetters({
        organizations: constants.ORGANIZATIONS
      })
    },
    methods: {
      ...mapActions({
        getOrganizations: constants.ORGANIZATION_GET_ORGANIZATIONS,
        changeStateOrganization: constants.ORGANIZATION_CHANGE_STATE
      }),
      editOrganization(organizationId){
        this.$router.push({ name: 'DetailOrganization', params: { id: organizationId } });
      },
      newOrganization() {
        this.$router.push({ name: 'NewOrganization' });
      }
    }
}
</script>

<style scoped>

</style>
