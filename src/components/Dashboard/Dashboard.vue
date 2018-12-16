<template>
    <div class="wrapper">
        <div class="app-container">            
            <nav class="navbar">
                <div class="toggle-button">                    
                    <button type="button" class="btn btn-info navbar-btn" @click="toggle">
                        <i class="fas fa-align-justify"></i>
                    </button>
                </div>
                <div class="title">
                    <h3 class="mainTitle">EN BOGOTÁ SE PUEDE SER</h3>
                    <h5 class="subtitle">ADMINISTRADOR</h5>
                </div>
                <div>
                    <button type="button" class="btn btn-link navlink" @click="toggle">CERRAR SESIÓN</button>
                </div>   
            </nav>
            
            <div class="dashboard">
                <nav v-if = "active" class="sidebar">
                    <ul class="list-unstyled components">                                     
                        <router-link tag="li" active-class="active" :to="{name: 'Home'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">Destacados</div> 
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
                                    <div class="section-text">Eventos</div> 
                                    <div class="section-icon"><i class="far fa-calendar"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'News'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">Noticias</div> 
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
                                    <div class="section-text">Organizaciones</div> 
                                    <div class="section-icon"><i class="fas fa-users"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'Alliance'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">Alianzas</div> 
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
                                    <div class="section-text">Censo</div> 
                                    <div class="section-icon"><i class="far fa-list-alt"></i></div>
                                </div>
                            </a>                        
                        </router-link>
                        <router-link tag="li" active-class="active" :to="{name: 'Complaint'}">
                            <a href="#"> 
                                <div class="section"> 
                                    <div class="section-text">Denuncias</div> 
                                    <div class="section-icon"><i class="fas fa-gavel"></i></div>
                                </div>
                            </a>                        
                        </router-link>                    
                    </ul>            
                </nav>

                <!-- Page Content  -->
                <div class="content">               
                    <router-view></router-view>                
                </div>
            </div>
        </div>
    </div>

</template>

<script>

  export default {
    name: 'Dashboard',
    data () {
      return {
        active: true
      }
    },
    methods: {
      toggle: function() {
        this.active = !this.active
      }
    },
  }
</script>

<style scoped>

@import "https://fonts.googleapis.com/css?family=Nunito:300,400,500,600,700";

.app-container {
    display: flex;
    flex-direction: column;
    
}
/* navbar */

.navbar {
    font-family: 'Nunito';
    background: #009de0;
    border: none;
    border-radius: 0;
    height: 80px;
    display: flex;
    padding: 0 0;
}

.navlink {
  font-family: Nunito;
  font-weight: bold;
  font-size: 12px;
  text-align: right;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color:#ffffff;
  text-decoration: none;
}

.navbar-btn:hover {
  background: #009DE0
}
.navlink:hover {
  font-size: 14px;
}

.title {  
  flex: 1;
  text-align: left;
}
.mainTitle{
    color: white;
    font-style: normal;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    font-weight: 800;
    }
.subtitle{
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

/* sidebar */

.sidebar {
  width: 237px;
  background: #202122;
  color: #fff;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  font-size: 15px;
  text-align: center;
  letter-spacing: 0.02em;
}

.sidebar-header {
  padding: 0px;
  background: #202122;
}

.sidebar {
    padding: 0 0;
    border-bottom: 1px solid #141313;
}

.sidebar li a {
    padding: 10px;
    display: block;
}

.sidebar li a:hover {
    color: #000;
    background: #009DE0;
}

li.active>a{    
    color: #009DE0;
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

.section{
    display: flex;
}
.section-icon {
    min-width: 50px;
    max-width: 50px;
}

.section-text {
    min-width: 187px;
    max-width: 187px;
}
/* content */

.content {
  display: flex;
  width: calc(100% - 237px);
  padding: 20px;
  height: calc(100vh - 200px);
  transition: all 0.3s;
  background-color: #EAEAEC;
}
    



.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}



.dashboard{
    display: flex;
}

.toggle-button{
    width: 237px;
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

</style>
