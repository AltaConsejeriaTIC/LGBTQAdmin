<template>
  <div class="ui medium image">
    <croppa v-model="myCroppa"
            :quality="2"
            :width="w"
            :height="h"
            :prevent-white-space="true"
            :show-remove-button="false"
            :file-size-limit="1024000"
            @file-size-exceed="onFileSizeExceed">
      <img crossOrigin="anonymous" :src="image" slot="initial">
    </croppa>
    <button class="ui button" @click="myCroppa.chooseFile()">
      <i class="edit icon"></i>
      Editar
    </button>
    <p>Editar Foto(Alejar, acercar, mover)</p>
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
        required: true
      },
      w: {
        type: Number,
        required: true
      },
      h: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        myCroppa: null,
        image: null,
      }
    },
    created(){
      Vue.axios.get(`${ENV.ENDPOINT}${this.img}`,{responseType: 'blob'})
        .then(response => {
          this.image = window.URL.createObjectURL(new Blob([response.data],{type: 'image/jpeg'}))
        })
        .catch((e) => {
          console.log(e);
        });
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
        console.log("--------nombre foto---------\n",name);
        this.myCroppa.generateBlob( blob => {
          var fd = new FormData();
          fd.append('file', blob, name);
          Vue.axios.post(`/upload`, fd )
            .then(response => {
              console.log(response)
            })
            .catch((e) => {
              console.log(e);
            });
        });
      },
      onFileSizeExceed (file) {
        alert('File size exceeds. Please choose a file smaller than 1MB.')
      }
    }
  }
</script>

<style scoped>

</style>
