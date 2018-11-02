<template>
  <div class="ui bottom attached segment pushable">
    <div class="ui visible inverted left vertical sidebar menu">
      <a class="item" ><i class="home icon"></i> Eventos </a>
      <a class="item"><i class="home icon"></i> Noticias </a>
      <a class="item"><i class="smile icon"></i> Alianzas </a>
      <a class="item"><i class="smile icon"></i> Organizaciones </a>
      <a class="item"><i class="calendar icon"></i>Usuarios</a>
    </div>
    <div class="pusher">
      <div class="ui basic segment">
        <h3 class="ui header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Contenido de la aplicación</font></font></h3>
        <p></p>
        <img src="../../assets/logo-alcaldia.png" width=30% height=30%>
        <Event></Event>
      </div>
    </div>
  </div>
</template>

<script>
import Event from "../Event/Event";

export default {
  components: {Event},
  methods: {
  }
};
</script>

<style scoped>
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
