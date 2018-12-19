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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.table .thead-light th{
    background-color: #F9FAFB !important;
    line-height: 14px;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #7C7F92;
}

.p-form{
  text-align: left;
  font-style: normal;
  font-weight: 800;
  line-height: 1.4;
  font-size: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;

  color: #575A6D;
  padding: 0;
  margin-right: 10%;
}

.p-form ::placeholder{
  font-weight: 600;
  line-height: 20px;
  font-size: 13px;
  letter-spacing: 0.01em;
  color: #A8ABBA;

}

input[type=text]{
  height: 40px;
}

.p-title{
  margin: 20px 0;
  height: 44px;
}
.text{
  font-weight: bold;
  line-height: 27px;
  font-size: 22px;
  font-style: normal;
  font-family: Nunito,Arial,monospace;
  color: #3F4150;
}

.btn{
  box-sizing: border-box;
  border-radius: 4px;
  text-align: center;
  font-size: 14px !important;

}

.btn.big{
  height: 44px;
}

table.table{
  text-align: left;
  background-color: #fff;
  margin-top: 24px;
  margin-bottom: 0;
  height: auto;
  overflow-y: auto;
  max-height: 70%;
}

table.table td, table.table th{
  vertical-align: middle;
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
</style>
