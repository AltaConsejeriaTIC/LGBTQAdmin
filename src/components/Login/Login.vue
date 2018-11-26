<template>
  <form class="ui form" >
    <img src="../../assets/logo-alcaldia.png" width=30% height=30%>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
          <div class="content"></div>
        </h2>
          <div class="ui stacked secondary  segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input v-model="form.email" type="text" id="email" class="form-control" placeholder="E-mail">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input v-model="form.password" type="password" id="password"  class="form-control" placeholder="Password">
              </div>
            </div>
            <button class="fluid ui blue button" :disabled="isDisabled" @click="sigin">Login</button>
          </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.Session.token
    }),
    isDisabled: function() {
      return this.form.email === '' || this.form.password === '';
    },
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED
    })
  },
  methods: {
    ...mapActions({
      login: constants.SESSION_LOGIN
    }),
    sigin() {
      this.login(this.form);
    }
  },
  watch: {
    token(data) {
      if (this.isLogged) {
        sessionStorage.setItem('token', this.token);
        this.$router.push({ name: 'Dashboard',  params: { component: "events" }  });
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
