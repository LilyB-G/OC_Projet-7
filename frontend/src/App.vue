<template>
  <div class="body">
    <div class="container-fluid border ">

      <div class="ms-5">

        <div class="col border">
          <sideMenu />
        </div>
        <div class="d-flex justify-content-center ms-5 mainFrame">
          <div class="col-lg border ms-5">

            <router-view />
          </div>
        </div>


      </div>
      <div class="container-fluid border">
        <NavBar />
      </div>
    </div>
  </div>
</template>


<script setup>
import sideMenu from '@/components/SideMenu.vue';
import NavBar from '@/views/NavBar.vue';





</script>

<style>
.body{
  background-color: #D0CEDC;
}

/* .mainFrame{
  max-width: 100%;
} */

</style>













