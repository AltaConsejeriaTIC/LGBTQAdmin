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

@import "https://fonts.googleapis.com/css?family=Nunito:300,400,500,600,700";
body {
  background-color: #131520;
  height: 100%;
}

#app {
  font-family: 'Nunito';
}

.table .thead-light th{
    background-color: #F9FAFB !important;
    line-height: 14px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #7C7F92;
}
</style>
