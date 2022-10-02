<template>
    
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <sideMenu />
                
                <div class="d-flex">
                    <div class="card mb-3 m-auto">
                        <div class="card-header">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle"
                                alt="Avatar">
                            <input class="form-control" readonly v-model="chatStore.ori">
                            <button type="button" class="btn btn-outline-danger ms-5"
                                @click="chatStore.action = 'update'">Répondre</button>

                        </div>
                        <img src="https://picsum.photos/400/200" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional
                                content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <router-view />

</template>
  
<script setup>

import sideMenu from '@/components/SideMenu.vue';
//import textAreaAutosize from '@/components/TextAreaAutosize.vue';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from '@/store/UserStore';
import { onMounted } from "vue";



const Query = require('@/components/genericQuery');

//pinia Storage access

const chatStore = useChatStore();
const userStore = useUserStore();

    onMounted(() => {


        // charger les posts
        const obj = {};
        const routeToBack = '/chat/all';
        const Method = 'post';
        chatStore.userId = userStore.userId;

        const response = Query.postQuery(obj, routeToBack, Method);
        if (response == undefined) {
            console.log('backend unreachable ');

        } else {
            if (response.status == 200) {

                //chat = response.data;
            } else {
                console.log(response.status);
            }
        }

        // ini variables
    });





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