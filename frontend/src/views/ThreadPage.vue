<template>
<div class="d-flex">
    <div class="card mb-3 m-auto">
        <div class="card-header">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle" alt="Avatar">
            Léo Pard
            <button type="button" class="btn btn-outline-danger ms-5" @click="showForm">Répondre</button>
        </div>
        <img src="https://picsum.photos/400/200" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
</div>
</template>

<script setup>
   
   import { inject, reactive } from "vue";

   /* const props = defineProps({

    modelValue: {
        content:String,
        showFormPost: Boolean,

    }, 

});*/

const chat = inject("Chat");

const show = reactive( {"showFormPost" : inject("showFormPost") });

function showForm(){
    show.showFormPost = true;
    console.log(show.showFormPost);
};



</script>

<style scoped>
@media (min-width: 768px) {
.card {
    width: 70%;
}
}
/*.card-body {
max-height: 10rem;
object-fit: cover;
}*/
.card-header img {
width: 68px;
}
</style>


