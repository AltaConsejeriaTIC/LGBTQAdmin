<template>
  <div class="ui medium image">
    <croppa v-model="myCroppa"
            :quality="1"
            :width="300"
            :height="300"
            :prevent-white-space="true"
            :show-remove-button="false">
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
      }
    },
    data() {
      return {
        myCroppa: null,
        image: null,
      }
    },
    created(){
      Vue.axios.get(`${ENV.ENDPOINT}/${this.img}`,{responseType: 'blob'})
        .then(response => {
          this.image = window.URL.createObjectURL(new Blob([response.data],{type: 'image/jpeg'}))
          console.log(this.image2)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    methods: {
      uploadImage() {
        if (!this.myCroppa.hasImage()) {
          alert('No hay imagen')
          return
        }
        let name = this.img.split("/");
        name = name[name.length - 1];
        this.myCroppa.generateBlob( blob => {
          var fd = new FormData();
          fd.append('file', blob, name);
          Vue.axios.post(`/upload`, fd )
            .then(response => {
              console.log(response)
              alert("Imagen Cargada.");
            })
            .catch((e) => {
              console.log(e);
              alert("Ha ocurrido un error. Vuelve a intentarlo.")
            });
        });
      }
    }
  }
</script>

<style scoped>

</style>
