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
  text-align: left;
  margin: 20px 0;
  height: 44px;
}

.p-title h2{
  margin-top: 7px;
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

.image{
  margin: 0 auto;
  width: min-content;
}

.p-card .card-img-top, .p-card button{
  background: #DFE0E1;
  border: 1px solid #CBCED0;
  box-sizing: border-box;
}

.p-card button{
  border-radius: 0 0 4px 4px;
  border-top: 0;
  height: 45px;
  width: 100%;
}

.p-card .card-img-top{
  border-radius: 4px 4px 0 0;
}

.form-row button{
  width: 30%;
  margin-bottom: 15px;
}

.big.btn-warning{
  min-width: 154px;
}

form .btn-warning {
  min-width: 154px;
  font-weight: bold;
  line-height: 21px;
  border: 1px solid #E0AE0D;
  color: #161824;
}

.p-errors {
  text-align: -webkit-left;
  color: #ff6347;
}

.p-link {
  color: #009bdc99;
  text-decoration: none;
  background-color: transparent;
  font-size: 16px;
}

.fa-angle-left{
  font-size: 14px;
}
#content > div > div.container-fluid.row{
  margin: 0;
  padding: 0;
}

.btn-light{
  background: #DFE0E1;
  border: 1px solid #CBCED0;
  box-sizing: border-box;
  border-radius: 4px;

}

button.actions{
  height: 32px;
  width: 73px;
  line-height: 20px;
  font-size: 13px;
}
button.actions:first-child{
  margin-bottom: 0;
  margin-right: 10px;
}

.white-space-pre {
  white-space: pre-wrap;
}

td.p-actions {
  width: 195px;
}

.was-validated .form-control:valid, .form-control.is-valid, .was-validated .custom-select:valid, .custom-select.is-valid {
  border: 1px solid #ced4da;

}

.form-control:focus, .form-control.is-valid:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

@media (max-width: 1100px){
  button.actions:first-child{
    margin-right: 0;
    margin-bottom: 10px;
  }
}

@media (max-width: 992px) {
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

@media (max-width: 1010px) {
  .p-form{
    margin: 0;
  }

  .container-fluid.row{
    flex-direction: column-reverse;
  }

  .col{
    min-height: unset;
  }
}
@media (max-width: 1200px) {
  .card-img-top.croppa-container canvas{
    width: 300px !important;
    height: 240px !important;
  }
}
</style>
