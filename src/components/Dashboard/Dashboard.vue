<template>
    <div class="wrapper">
        <div class="app-container">            
            <nav class="navbar">
                <div class="toggle-button">                    
                    <button type="button" id="sidebarCollapse" class="btn btn-info" @click="toggle">
                        <i class="fas fa-align-justify"></i>
                    </button>
                </div>

                <div class="title">
                    <h3 class="mainTitle">EN BOGOTÁ SE PUEDE SER</h3>
                    <h5 class="subtitle">ADMINISTRADOR</h5>
                </div> 

                <div class="logout-button">
                    <button type="button" class="btn btn-link navlink" @click="signout">CERRAR SESIÓN</button>
                </div>   
            </nav>
            
            <div class="dashboard">
                <nav v-if = "active" id="sidebar">
                    <ul class="list-unstyled components">                                     
                        <router-link tag="li" active-class="active" :to="{name: 'Home'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">DESTACADOS</div> 
                                    <div class="section-icon"><i class="far fa-star"></i></div>
                                </div>
                            </a>
                        </router-link>
                        <li class="group-text">                        
                                AGRUPACION 1
                        </li>
                        <router-link tag="li" active-class="active" :to="{name: 'Event'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">EVENTOS</div> 
                                    <div class="section-icon"><i class="far fa-calendar"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'News'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">NOTICIAS</div> 
                                    <div class="section-icon"><i class="far fa-bell"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <li class="group-text">                        
                                AGRUPACION 2
                        </li>
                        <router-link tag="li" active-class="active" :to="{name: 'Organization'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">ORGANIZACIONES</div> 
                                    <div class="section-icon"><i class="fas fa-users"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'Alliance'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">ALIANZAS</div> 
                                    <div class="section-icon"><i class="far  fa-handshake"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <li class="group-text">                        
                                AGRUPACION 3
                        </li>
                        <router-link tag="li" active-class="active" :to="{name: 'PersonalData'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">CENSO</div> 
                                    <div class="section-icon"><i class="far fa-list-alt"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'Complaint'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">DENUNCIA</div> 
                                    <div class="section-icon"><i class="fas fa-gavel"></i></div>
                                </div>
                            </a>                        
                        </router-link>                    
                    </ul>            
                </nav>

                <!-- Page Content  -->
                <div id="content">               
                    <!--<img src="../../assets/logo-alcaldia.png" width=30% height=30%>-->
                  <router-view class="content"></router-view>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  import { mapActions, mapGetters} from 'vuex';
  import * as constants from '@/store/constants';

  export default {
    name: 'Dashboard',
    data () {
      return {
        active: true
      }
    },
    methods: {
      ...mapActions({
        logout: constants.SESSION_LOGOUT
      }),
      signout() {
        this.logout();
        this.$router.push('/login')
      },
      toggle: function() {
        this.active = !this.active
        console.log('ACTIVE===',this.active)
        console.log(window.location.pathname)
      }
    }
  }

</script>

<style scoped>

@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

/* navbar */
.navbar {
    font-family:  Nunito  ;
    background: #009de0;
    border: none;
    border-radius: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    /*padding: 140px !important;*/
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}
.navlink {
    color:#fafafa;
}

/* sidebar */

#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #202122;
    color: #fff;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #202122;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #141313;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #009DE0;
    background: rgba(248, 251, 252, 0.1);
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color:  #009DE0;
    background: rgba(248, 251, 252, 0.1);
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.5s;  
    height: 39px;
    font-size: 15px;  
}

/* content */

#content {
    width: 100%;
    height: calc(100vh - 64px);
    min-height: 497px;
    transition: all 0.3s;
    background-color: #EAEAEC;
    
}

.app-container {
    display: flex;
    flex-direction: column;
}



.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

.title {  
  flex: 1;
  text-align: left;
}
.mainTitle{
    color: white;
    font-weight: 800;
}
.subtitle{
  font-weight: bold;
  color: black;
}


.wrapper {
    display: flex;
    flex-direction: column;
    max-height: 1000vh;
    /*min-width: 1400px;*/
    width: 100%;
    align-items: stretch;
}
.dashboard{
    display: flex;
}

.toggle-button{
    width: 250px;
}

.logout-button{
  margin-right: 8%;
}

.section{
    display: -webkit-box;
}
.section-icon {
    min-width: 50px;
    max-width: 50px;
}

.section-text {
    min-width: 200px;
    max-width: 200px;
    margin-left: -10px;
}
.group-text{
    height: 54px;    
    color: #7A7B80;
    left: 24px;
    font-size: 12px;
    padding-left: 24px;
    padding-top: 30px;
    text-align: left
}
a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

li {
    border-bottom: 1px solid #323436;
    
}

a.download {
    background: #fff;
    color: #7386D5;
}

a.article,
a.article:hover {
    background: #6d7fcc !important;
    color: #fff !important;
}


.btn-info{
    background-color: #343a40;
    border-color: rgb(100, 97, 97);
}

h1, h3, h5 {
  font-weight: normal;
  font-family: 'Nunito';
  margin: 0px;
}
.title {
  flex: 1;
  text-align: left;
}
.mainTitle{
  font-weight: 800;
}
.subtitle{
  font-weight: bold;
  color: black;
}


/* @media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
} */
  .content{
    width: 80%;
    height: calc(100vh - 64px);
    margin: 0 auto;
    padding-top: 36px;
    /*background-image: url("/static/img/logo-alcaldia.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: contain;*/
    /*background-position: center;*/
  }

@media (max-width: 1500px){
  .logout-button{
    margin-right: 7%;
  }
}
@media (max-width: 1100px){
  .logout-button{
    margin-right: 5%;
  }
}
</style>
