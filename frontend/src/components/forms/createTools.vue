<template>
<div >
    <div v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <button class="btn btn-danger mb-1" @click="open">open</button>     
</div>

</template>
<script setup>

import { useDropzone } from "vue3-dropzone";

const isDragActive = true;

const onDrop = (acceptFiles, rejectReasons) => {
      console.log(acceptFiles);
      console.log(rejectReasons);
    }

const getRootProps = useDropzone({ onDrop }).getRootProps;
const getInputProps = useDropzone({ onDrop }).getInputProps;
const rest = useDropzone({ onDrop }).rest;

console.log(getRootProps);
console.log(getInputProps);
console.log(rest);




</script>

<style>
</style>