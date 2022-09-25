<template>

    <div class="zindex">
        <div class="container-sm">
            {{PostForm.show}}
            <div class="form-floating mt-3" v-if="PostForm.show">

                <textAreaAutosize v-model="PostForm.show" />

            </div>
        </div>
    </div>

    <div class="d-flex">
        <div class="card mb-3 m-auto">
            <div class="card-header">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle" alt="Avatar">
                <input class="form-control" readonly v-model="message.content">
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

    <router-view />

</template>
  
<script setup>


import textAreaAutosize from '@/components/TextAreaAutosize.vue';
import { onMounted, ref, inject, provide, reactive, onUpdated } from "vue";

import { useStore } from 'vuex';

const Query = require('@/components/genericQuery');

//variables composition api

const chat = {};
/*
    user
*/
let user = {};

onMounted(() => {
    user = inject("user");
});


const message = {
    ownerId: '44',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum dolores quibusdam debitis possimus voluptates facilis, voluptatibus dolorem deleniti unde ullam, modi ipsum suscipit iure expedita odit reprehenderit veritatis. Exercitationem, quae.',

};

// partage de la varibale reactive avec page child

/*
             props
*/
let PostForm = reactive({ 'show': '' });

//textAreaString.value = $emit('update:textAreaString'); // actualisation de la variable reactive selon event



onMounted(() => {

    // charger les posts
    const obj = {};
    const routeToBack = '/chat/ini';
    const Method = 'post';
    const store = useStore();

    const response = Query.postQuery(obj, routeToBack, Method, store);
    if (response.status == 200) {
        chat = response.data;

    } else if (response.status != 200 && response.status != undefined) {
        console.log(response.status);
    }
    else {
        if (response.status == undefined) {
            console.log('no entries');
        } else {
            console.log(response);
        }

    };

    // ini variables
});

/*
    Show create / update form 
*/

function showForm() {
    // test si id user et id post owner correspondent
    //si non = créer un nouveau post de réponse
    PostForm.show = 'create';


    // si oui = éditer son message
    // PostForm.show = 'update' ;


    console.log('PostForm.show:' + PostForm.show);
}

    provide("OriginalContent", message.content);
    provide('ownerId', message.ownerId );


</script>
  
<style scoped>
.zindex {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 750px;
    z-index: 100;
}

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