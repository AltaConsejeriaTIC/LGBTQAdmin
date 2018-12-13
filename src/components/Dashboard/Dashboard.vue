<template>
  <div>
    <div class="ui secondary pointing menu">
      <div class="headerCenter">
        <div class="title">
          <h3 class="mainTitle">EN BOGOTÁ SE PUEDE SER</h3>
          <h5 class="subtitle">ADMINISTRADOR</h5>
        </div>        
        <div>
          <button class="logout" @click="signout">
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </div>      
    <div class="ui bottom attached segment pushable">
      <div class="ui visible inverted left vertical sidebar menu">
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
        <div class="ui basic segment">
          <router-view></router-view>
        </div>
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
.pushable {
  height: 100vh;
}
body > .grid {
  height: 100%;
}

.menu {
  margin: 0px;
  height: 8vh;  
}
.headerCenter { 
  margin-left: 260px;
  display: flex;
  padding-right: 100px;
  width: 100%;
  align-items: center;
  text-transform: uppercase;
  color: white;
}
.title {  
  flex: 1;
  text-align: left;
}
.mainTitle{
  font-weight: 800;
}
.subtitle{
  font-weight: bold;
  color: black;
}
.logout {
  font-size: 14px;
}
h1, h3, h5 {
  font-weight: normal;
  font-family: 'Nunito';
  margin: 0px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
