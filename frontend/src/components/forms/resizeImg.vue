<template>
  <div>
    <label for="file-input">
      <i class="bi bi-images"></i>
    </label>
    <input type="file" id="file-input" class="d-none" @change="readURL">
  </div>

  <div v-for="obj in original">
    <div>
      original:{{ obj.name }}
      <!-- <img :src="i"  />  -->
    </div>
  </div>
  <div v-for="prev in preview">
    <div>
      preview : {{ prev.blob }}
      <img :src="prev.blob" />
    </div>
  </div>
</template>


<script setup>

import { resizeImage } from '@/plugins/imgResize.js'
import { ref } from 'vue';
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from '@/store/UserStore';

const chatStore = useChatStore();
const userStore = useUserStore();

const original = ref(chatStore.files.original);
const preview = ref(chatStore.files.preview);
const idFiles = [];

const tempArray = [];


const readURL = (event) => {

  const file = event.target.files[0];

  //console.log(file);



  if (!event.target.files[0].type.match(/image.*/)) {
    console.log('Not an image');
    //original.value.push( URL.createObjectURL(file));
    if ( tempArray.length > 0 && !tempArray.includes(file.name) || tempArray.length == 0) {
      original.value.push({ "name": file.name, "file": file });
      tempArray.push(file.name);
      setFileToSend(file.name, file );
      console.log(chatStore.filesToSend);

    }
    
  }else{
    if ( tempArray.length > 0 && !tempArray.includes(file.name) || tempArray.length == 0) {
      original.value.push({ "name": file.name, "file": file });
      tempArray.push(file.name);
      resizeImage({ file: file, maxSize: 255 }).then((resizedImage) => {
        preview.value.push({ "name": file.name, "blob": URL.createObjectURL(resizedImage) });
        
      setFileToSend( {"name": file.name, "blob": resizedImage } );
      console.log(chatStore.filesToSend);
      })
      .catch((err) => {
      console.error(err);
    });
  };
  };
  console.log(tempArray);
  
};

const setFileToSend = (file) => {
  chatStore.filesToSend.push(file);
  const result = chatStore.addFile(userStore.token, {"name": file.name, "file": file.blob })
  
  console.log(result);

};



</script>

<style >

</style>
