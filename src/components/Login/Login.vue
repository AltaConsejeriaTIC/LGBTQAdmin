<template>
  <div class="container">
    <div class="row">
      <div class="col col-l">
        <div>
        <img class="img-up" src="../../assets/EBSPS.svg">
        </div>        
        <div>
          <img class="img-half" src="../../assets/logo.svg" >
        </div>
        <div>
        <img class="img-down" src="../../assets/manos.svg">
        </div>
      </div>
      <div class="col col-r" >
        <h1 style="margin-left: 22%">Iniciar sesión</h1> 
        <form>
          <div class="form-width">
            <div class="form-group">
              <label for="Usuario">Usuario</label>
              <input v-model="form.email" type="text" id="email" class="form-control" placeholder="Usuario">            
            </div>
            <div class="form-group">
              <label for="Contraseña">Contraseña</label>
              <input v-model="form.password" type="password" id="password"  class="form-control" placeholder="Contraseña">
            </div>  
            <button type="button" class="btn btn-primary btn-lg btn-block" :disabled="isDisabled" @click="sigin">INGRESAR</button>          
          </div>
        </form>        
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
        this.$router.push({ name: 'Dashboard'  });
      }
    }
  }
};
</script>

<style scoped>



.col {
  width: 559px;  
}


.col-l{    
  background: #009DE0;
  border-radius: 10px 0px 0px 10px; 
  min-height: 600px;
  min-width: 400px;
}

.col-r{  
  text-align: left;
  background: #EAEAEC;
  border-radius: 0px 10px 10px 0px; 
  min-width: 400px;
}

h1{  
  margin-top: 20.266%;
  margin-bottom: 5%;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;  
  line-height: 49px;
  font-size: 30px;
  color: #282A35;
}

form {
  margin-bottom: 35.72%;
}

.form-group {
  margin-bottom: 8%;  
}

.form-width{
  width: 55%;
  margin: auto;
}
.btn-block {
  margin-top: 4%;
}
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
}
</style>
