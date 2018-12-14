<template>
  <div>
    <div >
      <div >
        <div>
          <h3>EN BOGOTÁ SE PUEDE SER</h3>
          <h5>ADMINISTRADOR</h5>
        </div>        
        <div>
          <button @click="signout">
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>      
    <div>
      <div class="menu">
        <router-link
          tag="a"
          class="item"
          :to="{name: 'Event'}"> <i class="home icon"></i> Eventos
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'News'}">
          <i class="home icon"></i> Noticias
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'Alliance'}">
          <i class="home icon"></i> Alianzas
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'Organization'}">
          <i class="home icon"></i> Organizaciones
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'PersonalData'}">
          <i class="home icon"></i> Censo
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'Complaint'}">
          <i class="home icon"></i> Denuncia
        </router-link>
        <router-link
          tag="a"
          class="item"
          :to="{name: 'Home'}">
          <i class="home icon"></i> Home-carousel
        </router-link>
      </div>
      <div class="pusher">
          <router-view class="content"></router-view>
      </div>
    </div>
  </div>  
</template>

<script>
  import { mapActions, mapGetters} from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'Dashboard',
    methods: {
      ...mapActions({
        logout: constants.SESSION_LOGOUT
      }),
      signout() {
        this.logout();
        this.$router.push('/login')
      }
    }
  }

</script>

<style scoped>
  .pusher{
    background-color: #EAEAEC;
  }

  .content{
    width: 80%;
    height: calc(100vh - 106px);
    margin: 0 auto;
    padding-top: 36px;
  }
</style>
