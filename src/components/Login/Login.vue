<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui image header">
        <div class="content"></div>
      </h2>
      <form action="https://s.codepen.io/voltron2112/debug/PqrEPM?" method="get" class="ui large form">
        <div class="ui stacked secondary  segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="email" type="text" id="email" class="form-control" placeholder="E-mail">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="password" type="password" id="password"  class="form-control" placeholder="Password">
            </div>
          </div>
          <div v-if=!isDisabled type="submit" class="fluid ui disabled blue button" >Login</div>
          <div v-else type="submit" class="fluid ui blue button" @click="sigin">Login</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'Login',
  data () {
    return {
      form: {

      },
      email: '',
      password: '',
    }
  },
  computed: {
    isDisabled : function (){
      return this.email != "" && this.password != "";
    }
  },
  methods: {
    ...mapActions({
      login: constants.SESSION_LOGIN
    }),
    sigin(){
      this.login()
    }
  }

}
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
