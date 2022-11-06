<template>
    <div class="card w-50 messages" v-for="message in chatStore.Chat.data">
        <div class="card-header">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" class="rounded-circle" alt="Avatar">
            <div class="Head">{{message.UserLogin}}{{message.UserRole}}
                <div class="right">
                    created:{{message.DateCreation}} 
                    updated:{{message.DateUpdate}}
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger ms-5"
                @click="formAnswer(message.IdThread, message.ThreadMessage, message.UserLogin)">Répondre</button>
            <button type="button" class="btn btn-outline-danger ms-5"
                @click="formUpdate( message.IdThread, message.ThreadMessage ) " v-if="userStore.userId == message.IdUser">Update</button>    
        </div>
        <img src="https://picsum.photos/400/200" class="card-img-top" alt="...">
        <div class="card-body">
            <!-- <h5 class="card-title">Card title</h5> -->
            <p class="card-text">{{message.ThreadMessage}}</p>
            <p class="card-text"><small class="text-muted">{{message.DateUpdate}}</small></p>
        </div>
    </div>

</template>
  
<script setup>


//import textAreaAutosize from '@/components/TextAreaAutosize.vue';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from '@/store/UserStore';
import { defineProps } from 'vue';


const Query = require('@/components/genericQuery');

//pinia Storage access

const chatStore = useChatStore();
const userStore = useUserStore();


    // alimenter chatStore.userId
    chatStore.userId = userStore.userId;

    // charger les posts
    chatStore.get(userStore.token);

    // ini variables


    const postAttr = chatStore.postAttr;


function formUpdate(idThread,content){
    console.log (idThread);
    console.log (content);
    

    Object.assign(postAttr, {
        'IdThread': idThread,
        'action': 'update',
        'messageContent': content,
    });
    //console.log (chatStore.postAttr);


}
function formAnswer(idThread,content, threadOwner){
    //console.log (idThread);
    //console.log (content);
    

    Object.assign(postAttr, {
        'IdThread': idThread,
        'action': 'answer',
        'messageContent': content,
        'nameOwner': threadOwner,
    });
    console.log (chatStore.postAttr);


}


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