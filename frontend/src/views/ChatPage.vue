<template>
  <div>
    Chat Info
  </div>

  <div class="container-sm">>
    <div class="form-floating mt-3">
      <div contenteditable="true" class="form-control py-3" data-text="Rédigez votre message ici"></div>
    </div>
    <div class="d-flex">
      <button type="button" class="btn btn-secondary mt-2 ms-auto">Envoyer</button>
      <label for="file-input" class="btn btn-danger mt-2">Ajouter un fichier</label>
      <input id="file-input" type="file" class="d-none"/>
    </div>
    <hr>
  </div>

  <router-view />

</template>

<script>
import ThreadPageVue from './ThreadPage.vue';
export default {
  components:{
    ThreadPageVue
  }

}
</script>

<style scoped>
.form-floating >.form-control{
  height: auto;
  min-height: 5rem;
}

.form-control > div.form-control:empty:not(:focus)::before{
  content: attr(data-text);
  color: #a0a0a0;
  display: block;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}
</style>