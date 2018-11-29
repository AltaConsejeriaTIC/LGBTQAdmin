<template>
  <div class="ui bottom attached segment pushable">
    <div class="ui visible inverted left vertical sidebar menu">
      <a @click="changeComponent('Event')" class="item" ><i class="home icon"></i> Eventos </a>
      <a @click="changeComponent('News')" class="item"><i class="home icon"></i> Noticias </a>
      <a @click="changeComponent('Alliance')" class="item"><i class="smile icon"></i> Alianzas </a>
      <a @click="changeComponent('Organization')" class="item"><i class="smile icon"></i> Organizaciones </a>
      <a @click="changeComponent('algo')" class="item"><i class="calendar icon"></i>Usuarios</a>
    </div>
    <div class="pusher">
      <div class="ui basic segment">
        <h3 class="ui header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Contenido de la aplicación</font></font></h3>

        <img src="../../assets/logo-alcaldia.png" width=30% height=30%>
        <component :is="dynamiComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Event from "../Event/Event";
import News from "../News/News";
import Alliance from "../Alliance/Alliance";
import Organization from "../Organization/Organization";

export default {
  components: {
    Event,
    News,
    Alliance,
    Organization
  },
  data() {
    return {
      dynamiComponent: ``
    }
  },
  created() {
    console.log("---Creado-----");
    this.selectComponent( this.$route.params.component )
  },
  methods: {
    changeComponent( component ) {
      this.dynamiComponent = component
    },
    selectComponent( component ) {
      switch (component) {
        case "events":
          this.dynamiComponent = "Event";
          break;
        case "news":
          this.dynamiComponent = "News";
          break;
        case "organizations":
          this.dynamiComponent = "Organization";
          break;
        case "alliances":
          this.dynamiComponent = "Alliance";
          break;
        case "users":
          this.dynamiComponent = "User";
          break;
      }
    }
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
