<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
import Login from './components/Login/Login';

export default {
  name: 'app',
  components: {
    Login
  },
  data() {
    return {};
  }
};
</script>

<style>
body {
  background-color: #131520;
  height: 100%;
}
#app {
  font-family: 'Nunito';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
