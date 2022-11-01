<template>
    <div class="container border bg-light fixed-top">
        <div class="d-flex">

            <div v-if="(chatStore.postAttr.action == 'create' || chatStore.postAttr.action == 'answer')">
                <createTools /> <!-- vue components tools create -->
            </div>
            <div v-if="chatStore.postAttr.action == 'update'">
                <updateTools /> <!-- vue components tools update -->
            </div>
        </div>
        <div
            v-if="(chatStore.postAttr.action == 'create' || chatStore.postAttr.action == 'update' || chatStore.postAttr.action == 'answer')">
            <img src="ListImages" alt="">
                {{ListImages}}
         
            <textarea 
                class="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                v-model = "thisPost.messageContent" 
                @input = "inputevent">
            </textarea>

        </div>
        <div class="d-flex justify-content-end align-items">
            <div>
                <button type="button" class="btn btn-danger"
                    v-if="(chatStore.postAttr.action == 'create' || chatStore.postAttr.action == 'answer')"
                    @click="post">Send</button>
                <button type="button" class="btn btn-danger" v-if="chatStore.postAttr.action == 'update'"
                    @click="post">Actualize</button>
                <button type="button" class="btn btn-secondary" @click="close">Abort</button>
            </div>
        </div>
    </div>
    <br>


</template>



<script setup>
/*
 import
*/
import { ref } from "vue";

import { useAutoresizeTextarea } from "@/components/resizeTextArea";
import createTools from '@/components/forms/createTools.vue';
import updateTools from '@/components/forms/updateTools.vue';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from "@/store/UserStore";



//pinia Storage access

const chatStore = useChatStore();
const userStore = useUserStore();

const textarea = ref();
useAutoresizeTextarea(textarea);

const files = ''; // a compléter ultérieurement
const userId = userStore.userId;
const IdThread = chatStore.postAttr.IdThread;
const data = {};


const action = chatStore.postAttr.action;
const thisPost = ref(chatStore.postAttr);

//console.log(thisPost.value.messageContent);

const ListImages = sortImages();

function sortImages(){
    
    // get images from db
    //chatStore.getFiles(userStore.token,IdThread);
    // resize images


};

if (thisPost.value.action == 'answer') {
    const head = thisPost.value.nameOwner + ' a écrit: < ';
    //console.log('head:' + head);
    thisPost.value.messageContent = head + thisPost.value.messageContent + ' >';
};

//console.log('message:' + thisPost.value.messageContent);

function close() {
    thisPost.value.action = '';
};

function post() {
    
    if (action == 'update') {
       Object.assign(data,{
            UserId: userId,
            IdThread: IdThread,
            ThreadMessage: thisPost.value.messageContent,
            idFichiersJoints: files,
        });
    };
    if (action == 'create') { 
        Object.assign(data,{
            UserId: userId,
            ThreadMessage: thisPost.value.messageContent,
            idFichiersJoints: files,
        });
    };
    if (action == 'answer') { 
        Object.assign(data,{
            UserId: userId,
            ThreadMessage: thisPost.value.messageContent,
            idFichiersJoints: files,
        });

    };
    
    //console.log (data);
    chatStore.postForm(userStore.token, data, action);
    // recharger la page
    chatStore.get(userStore.token);
    // vider chatStore.postAttr
    Object.assign(chatStore.postAttr,
     {
        'IdThread': '',
        'action': '',
        'messageContent': '',
        'nameOwner': '',
     });

    // close 
    close();
};

const inputevent = () => {
    console.log (thisPost.value.messageContent);
}

</script>
    
    
<style scoped>
textarea {
    padding: 10px;
    width: 65%;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
}

label {
    display: block;
    margin-bottom: 10px;
}

p.center {
    text-align: center;
}
</style>