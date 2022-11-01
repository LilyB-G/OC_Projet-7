<template>
    <button class="btn btn-dark fixed-top" v-if="showPostCreate()" @click = "chatStore.postAttr.action = 'create'">Create New </button>

    <div class="zindex">
        <div class="container-sm">
            <div class="form-floating mt-3" v-if="chatStore.showForm">

                <textAreaAutosize />

            </div>
        </div>
    </div>


</template>
<script setup>
import { useChatStore } from '@/store/chatStore';
import textAreaAutosize from '@/components/TextAreaAutosize.vue';
import {useRoute} from 'vue-router'

const chatStore = useChatStore();
const thisRoute = useRoute();

const showPostCreate = () => {
    
    if (thisRoute.path == '/Chat'){
        return true;
    }else{ 
        return false;
    };
    
}


</script>
<style >
.groupomania {
    font-family: 'Lato', sans-serif;
    font-size: 20px;

}
</style>
