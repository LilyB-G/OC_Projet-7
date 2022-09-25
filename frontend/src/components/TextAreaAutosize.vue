<template>
    <div class="container border bg-light " >
        <div class="d-flex">
            <div v-if=" props.modelValue == 'create' ">
                <createTools /> <!-- vue components tools create -->
            </div>
            <div v-if=" props.modelValue == 'update' ">
                <updateTools /> <!-- vue components tools update -->
            </div>
        </div>
        <div>
            <textarea ref="el"
                class="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                v-if = "props.modelValue == 'create'" v-model="blankMessage"> 
            </textarea>
            
            <textarea ref="el"
                class="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                v-if ="props.modelValue == 'update'" v-model="message" > 
            </textarea>
        </div>
        <div class="d-flex justify-content-end align-items">
            <div v-if=" props.modelValue == 'create' " >
                                           
                    <div><createAction v-model="message" /></div> <!-- vue components action create -->
                
                    <button type="button" class="btn btn-secondary" @click="close">Abort</button>
       
            </div>
            <div v-if=" props.modelValue == 'update' ">
                <updateAction v-model="message" /> <!-- vue components action update -->
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
import { onBeforeUnmount, onMounted, ref, watch, inject, computed, reactive , provide, onUpdated } from "vue";

import autosize from "autosize/dist/autosize";
import createAction from '@/components/forms/createActions.vue';
import updateAction from '@/components/forms/updateActions.vue';
import createTools from '@/components/forms/createTools.vue';
import updateTools from '@/components/forms/updateTools.vue';


/*
props
*/

const props = defineProps({
    modelValue : String,  // post action = create / update
})

// valeurs provide - inject héritées de ChatPage


/* let action = ref('');
action = inject("PostAction");  */

const emit = defineEmits(['PostForm.show']);

let message = inject("OriginalContent") ;
let blankMessage =  'test '

/*
autosize text area
*/
const el = ref();

onMounted(() => {
    autosize(el.value);
    
    //console.log('textAreaAutosize.vue message: ' + message.content);

});


onBeforeUnmount(() => autosize.destroy(el.value));


/*
show this form
*/

function close(){
    emit('PostForm.show', false);
    console.log( 'action close');
    
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