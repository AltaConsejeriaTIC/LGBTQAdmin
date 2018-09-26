<template>
  <div id="app">
    <img src="./assets/logo-alcaldia.png" width=30% height=30%>
    <router-view/>
  </div>

</template>

<script>
import Login from './components/Login/Login';

export default {
  name: 'app',
  components: {
    Login,
  },
  data() {
    return {
    };
  },
}
</script>

<style>
body {
  background-color: #409FDC;
}
#app {
  margin-top: 60px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
