<template>
  <div class="ui grid">
    <div class="five wide column">
      <ImageContent :img="data.image"  :w="200" :h="200"  ref="imgContent"></ImageContent>
    </div>

    <div class="ten wide column">
      <div v-if="errors.length">
        <b>Por favor corriga los siguientes errores:</b>
        <ul>
          <li v-for="error in errors" >{{ error }}</li>
        </ul>
      </div>
      <form class="ui form" @submit="checkForm">
        <div class="field">
          <label>Nombre</label>
          <input type="text" v-model="data.name">
          <label>Descripción</label>
          <textarea rows="8" v-model="data.description"></textarea>
        </div>
        <div class="field">
          <label>Oferta</label>
          <textarea rows="5" v-model="data.offer"></textarea>
          <label>Sitio Web</label>
          <input type="text" v-model="data.website">
          <label>Teléfono</label>
          <input type="text" v-model="data.phone">
          <label>Email</label>
          <input type="text" v-model="data.email">
        </div>
        <div class="field">
          <label>Fecha: {{data.finish_date}}</label>
          <input type="date" v-model="data.finish_date">
        </div>
        <button class="ui button" type="submit" >Guardar</button>
      </form>
    </div>
    <div class="fifteen wide column">
      <button class="ui button back" @click="goBack">
        <i class="caret left icon"></i>
        Volver
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewAlliance"
    }
</script>

<style scoped>

</style>
