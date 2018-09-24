<template>
  <div id="" class="container">
    <div>
      <form >
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="text" id="email" class="form-control">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password"  class="form-control">
        </div>

        <button type="submit" class="btn btn-primary" v-bind:disabled= "!isDisabled">Continuar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {

      },
      email: '',
      password: ''
    }
  },
  methods: {
    isFormValid: function () {
      return this.first_name != '' && this.last_name != '';
    }
  },
  computed: {
    isDisabled : function (){
      return this.email != "" && this.password != "";
    }
  }
}
</script>

<style scoped>
h1, h2 {
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
