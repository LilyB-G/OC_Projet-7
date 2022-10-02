<template>

    <button class="btn btn-dark" @click = "chatStore.action = 'create'">Create New </button>

    <div class="zindex">
        <div class="container-sm">
            <div class="form-floating mt-3" v-if="chatStore.showForm">

                <textAreaAutosize v-model="chatStore.content" />

            </div>
        </div>
    </div>


</template>
<script setup>
import { useChatStore } from '@/store/chatStore';
import textAreaAutosize from '@/components/TextAreaAutosize.vue';

const chatStore = useChatStore();


</script>
<style >
.groupomania {
    font-family: 'Lato', sans-serif;
    font-size: 20px;

}
</style>
