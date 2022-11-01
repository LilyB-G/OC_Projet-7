<template>
  <div>
    <label for="file-input">
      <i class="bi bi-images"></i>
    </label>
    <input id="file-input" class="d-none" type="file" @change="onFileChange"/>
    <img src="file.name" alt="">
    
    <!-- <div v-bind="getRootProps()">
      <input v-bind="getInputProps()"/>
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <button class="btn btn-danger mb-1" @click="open">open</button>     -->
  </div>

</template>
<script setup>

import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/UserStore";
//import { useDropzone } from "vue3-dropzone";

const chatStore = useChatStore();
const userStore = useUserStore();

const obj = '';
let files = [];

function onFileChange(e){
  //console.log(e);
  files = e.target.files || e.dataTransfer.files;
  if ( !files.length ){
    return;
  };
  createImages(files);
  
};

function createImages(file){
  let image = new Image();
  let reader = new FileReader();

  reader.onload = (e)=>{
    createImages.image = e.target.result;
    console.log(vm);
  }
};


/* const isDragActive = true;

const onDrop = (acceptFiles, rejectReasons) => {
      console.log(acceptFiles);
      console.log(rejectReasons);
    }

const getRootProps = useDropzone({ onDrop }).getRootProps;
const getInputProps = useDropzone({ onDrop }).getInputProps;
const rest = useDropzone({ onDrop }).rest;

console.log(getRootProps);
console.log(getInputProps);
console.log(rest); */

const addFile = () => {
  chatStore.addFile(userStore.userId);
};

</script>

<style>

</style>