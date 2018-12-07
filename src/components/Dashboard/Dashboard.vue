<template>
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
    </div>
    <div class="pusher">
      <div class="ui basic segment">
        <img src="../../assets/logo-alcaldia.png" width=30% height=30%>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard' 
  }
</script>

<style scoped>
.pushable {
    height: 100vh;
}
body > .grid {
  height: 100%;
}
.image {
  margin-top: 1100px;
}
.column {
  max-width: 450px;
}

h1,
h2 {
  font-weight: normal;
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
