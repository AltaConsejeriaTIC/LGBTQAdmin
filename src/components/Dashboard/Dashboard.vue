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
      <a @click="changeComponent('Organization')" class="item"><i class="smile icon"></i> Organizaciones </a>
      <a @click="changeComponent('PersonalData')" class="item"><i class="calendar icon"></i>Usuarios</a>
      <a @click="changeComponent('Complaint')" class="item"><i class="calendar icon"></i>Denuncia</a>
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
import Event from "../Event/Event";
import News from "../News/News";
import Alliance from "../Alliance/Alliance";
import PersonalData from "../PersonalData/PersonalData";
import Organization from "../Organization/Organization";
import Complaint from "../Complaint/Complaint";

export default {
  components: {
    Event,
    News,
    Alliance,
    PersonalData,
    Organization,
    Complaint
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
          this.dynamiComponent = "PersonalData";
          break;
        case "complaints":
          this.dynamiComponent = "Complaint";
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
