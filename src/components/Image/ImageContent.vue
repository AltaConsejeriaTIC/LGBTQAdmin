<template>
  <div class="p-container">
    <div class="p-card">
      <croppa v-model="myCroppa"
              :quality="2"
              :prevent-white-space="true"
              :show-remove-button="false"
              :file-size-limit="1024000"
              @file-size-exceed="onFileSizeExceed"
              :placeholder="'  +  '"
              :width="w"
              :height="h"
              class="card-img-top">
        <img v-if="img!=''" crossOrigin="anonymous" :src="image" slot="initial">
      </croppa>
      <button @click="myCroppa.chooseFile()">
        <i class="edit icon"></i>
        Subir imagen
      </button>
    </div>
    <p>Las imágenes subidas serán cortadas para quedar con proporción {{this.ratio}}. El peso máximo de la imagen es de 1Mb.</p>
  </div>
</template>

<script>
  import * as ENV from '../../env';
  import Vue from 'vue';
  import Croppa from 'vue-croppa';

  Vue.use(Croppa);

  export default {
    name: "ImageContent",
    props: {
      img: {
        type: String,
        default: ""
      },
      w: {
        type: Number,
        required: true
      },
      h: {
        type: Number,
        required: true
      },
      ratio: {
        type: String,
        default: '5:4'
      }
    },
    data() {
      return {
        myCroppa: null,
        image: null,
      }
    },
    created(){
      if(this.img){
        Vue.axios.get(`${ENV.ENDPOINT}${this.img}`,{responseType: 'blob'})
          .then(response => {
            this.image = window.URL.createObjectURL(new Blob([response.data],{type: 'image/jpeg'}))
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    methods: {
      uploadImage( name ) {
        if (!this.myCroppa.hasImage()) {
          alert('No hay imagen')
          return
        }
        if(!name){
          name = this.img.split("/");
          name = name[name.length - 1];
        }        
        this.myCroppa.generateBlob( blob => {
          var fd = new FormData();
          fd.append('file', blob, name);
          Vue.axios.post(`/upload`, fd )
            .then()
            .catch((e) => {
              console.log(e);
            });
        });
      },
      onFileSizeExceed (file) {
        alert('Tamaño de archivo excedido. Pro favo elija una imagen menor a 1MB.')
      },
      onFileMismatch() {
        alert('Tipo de archivo no válido.')
      }
    }
  }
</script>

<style scoped>

p{
  font-weight: normal;
  line-height: 21px;
  font-size: 13px;

  color: #737582;
  text-align: left;
  padding: 4px;
}





</style>

