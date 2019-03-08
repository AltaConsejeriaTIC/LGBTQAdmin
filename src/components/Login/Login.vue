<template>
  <div class="app-background">
    <div class="app-login app-wrapper">
      <div class="col col-l" >
        <div class="app-login__image">
          <div>
            <img src="../../assets/EBSPS.svg">
          </div>
          <div>
            <img src="../../assets/logo.svg">
          </div>
          <div class="app-login__image-down">
            <img class="app-login--cover" src="../../assets/manos.svg">
          </div>
        </div>
      </div>
      <div class="col col-r" >
        <div class="form-center">
        <form>
          <div class="form-width">
            <div class="form-group">              
              <h1>Iniciar sesión</h1>
              <b-alert variant="danger" :show="error">
                El usuario o la contraseña son incorrectos
              </b-alert>
              <label for="email">Usuario</label>
              <input v-model="form.email" type="text" id="email" class="form-control" placeholder="Usuario">
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input v-model="form.password" type="password" id="password"  class="form-control" placeholder="Contraseña">
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block" :disabled="isDisabled" @click.prevent="sigin">INGRESAR</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>

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
      },
      error: false
    };
  },
  created(){

  },
  computed: {
    ...mapState({
      token: (state) => state.Session.token,
      alert: (state) => state.Session.alert
    }),
    isDisabled: function() {
      return this.form.email === '' || this.form.password === '';
    },
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
      showAlert: constants.SESSION_INVALID_LOGIN
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
    token() {
      if (this.isLogged) {
        this.$router.push({ name: 'Home'  });
      }
    },
    alert() {
      this.error = this.showAlert;      
    }
  }
};
</script>

<style scoped>

.app-background {
    background-color: #202122;
    height: 100vh;
    display: flex;
}

.app-wrapper {

    max-width: 968px;
    margin-left: auto;
    margin-right: auto;
}

.app-login {
    border-radius: 10px;
    background-color: white;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    overflow: hidden;
}

.app-login__image,
.app-login__form {
    flex: 1;
}

.app-login__image {
    background-color: #009de0;
}

.app-login__image>div {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.app-login--cover {
    object-fit: cover;
}

.app-login__image-down {
    width: 100%;
}


.col {
  width: 559px;
}


.col-l{
  background: #009DE0;
  min-width: 400px;
  max-width: 484px;
}
.col-r{
  text-align: left;
  background: #EAEAEC;
  border-radius: 0px 10px 10px 0px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 484px;
  padding-bottom: 4rem;
  padding-top: 4rem;
}
.form-group {
  margin-bottom: 8%;
}

.form-width{
  width: 55%;
  margin: auto;

}
form {

  /* justify-content: center; */
}

.btn-block {
  margin-top: 4%;
}
h1{
  font-weight: bold;
  line-height: 49px;
  font-size: 30px;
  color: #282A35;
}

@media only screen and (max-width: 1000px) {
    .app-login {
        display: block;
    }
    .app-login__image {
        display: flex;
        justify-content: center;
    }
    .app-login__image>div {
        margin: 1rem 2rem;
    }
    .app-login__image-down {
        display: none !important;
    }
}

/*
.img-up {
  margin-top: 10% ;
  width: 30%;
}
.img-half {
  margin-top: 10% ;
  width: 33%;
}
.img-down {
  position: absolute;
  width: 100%;
  bottom:0% ;
  right:0px;
  margin-top: 10%;
}

.container {
  margin-top: 3.266%;
  display : -webkit-flex;
  display: flex;
} */
</style>
