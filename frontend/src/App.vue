<template>
  <div class="body">
    <div class="container-fluid border ">

      <div class="row">

        <div class="col border">
          <sideMenu />
        </div>
        <div class="mainFrame">
          <div class="col-lg border ">

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
body {
  background-color: #d0cedc;
}
.mainFrame {
  max-width : 70%
}
</style>













