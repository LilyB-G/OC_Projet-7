<template>
    <div class="container border bg-light fixed-top">
        <div class="d-flex">

            <div v-if=" chatStore.action == 'create' ">
                <createTools /> <!-- vue components tools create -->
            </div>
            <div v-if=" chatStore.action.includes('update') ">
                <updateTools /> <!-- vue components tools update -->
            </div>
        </div>
        <div v-if=" chatStore.action == 'create'">
            <textarea ref="textarea"
                class="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400" v-model="chatStore.content">
            </textarea>
            
        </div>
        <div v-if=" chatStore.action == 'update'">
            <textarea ref="textarea"
                class="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400" v-model="chatStore.content">
            </textarea>
            
        </div>    
        <div class="d-flex justify-content-end align-items">
            <div v-if=" chatStore.action == 'create' ">
                <button type="button" class="btn btn-danger" @click="insert">Send</button>
                <button type="button" class="btn btn-secondary" @click="close">Abort</button>

            </div>
            <div v-if=" chatStore.action.includes( 'update' ) ">
                <button type="button" class="btn btn-danger" @click="update">Actualize</button>
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

import {useAutoresizeTextarea} from "@/components/resizeTextArea";
import createTools from '@/components/forms/createTools.vue';
import updateTools from '@/components/forms/updateTools.vue';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from "@/store/UserStore";


//pinia Storage access

const chatStore = useChatStore();
const userStore = useUserStore();

const textarea = ref();
useAutoresizeTextarea(textarea);


function close() {
    chatStore.action = '';
};

function insert(){
    chatStore.postInsert(userStore.token);
    
};
function update(){
    chatStore.postUpdate(userStore.token,chatStore.threadEdited);
    
};

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