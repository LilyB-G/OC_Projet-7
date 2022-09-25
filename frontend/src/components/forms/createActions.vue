<template>
    <div class="d-flex">
        <button type="button" class="btn btn-secondary " @click="addfile">Send</button>
    </div>
</template>

<script setup>

import { inject , onUpdated, reactive } from 'vue'
import { useStore } from 'vuex';

const Query = require('@/components/genericQuery');

const props = defineProps({
    modelValue : String,
})

const post = reactive({
    content : props.modelValue,
    ownerId : inject ('ownerId'),
});
console.log(post);

const store = useStore();    

//console.log(store);
  
function postInsert(){
    const obj = {
        data: post,
    };
    const routeToBack = '/createPost:' + store.state.userId;
    const Method = 'POST';

    //console.log(obj);
    const response = Query.postQuery(obj, routeToBack, Method, store);
        if (response.status == 200) {
            console.log(response.status);
        } else if (response.status != 200) {
            console.log(response.status);
        }
        else {
            console.log(response);
        }
};

function addfile(){

};



</script>
<style>
</style>