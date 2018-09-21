<template>
  <div id="" class="container">
    <div>
      <form >
        <div class="form-group">
          <label for="first_name">Nombre:</label>
          <input v-model="first_name" type="text" id="first_name" class="form-control">
        </div>

        <div class="form-group">
          <label for="last_name">Apellido</label>
          <input v-model="last_name" type="text" id="last_name" class="form-control">
        </div>

        <button type="submit" class="btn btn-primary" v-bind:disabled= "!isFomrValid()">Continuar</button> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      first_name: '',
      last_name: ''
    }
  },
  methods: {
    isFormValid: function () {
      return this.first_name != '' && this.last_name != '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
