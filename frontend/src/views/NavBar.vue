<template>

  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/components/img/icon-left-font-monochrome-white.svg" class="img-fluid25" alt="...">
      </a>
    </div>
    <div @mouseover='showLogout'>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" to="/home">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/User">
              User
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="activeAdminLink" to="/Admin">
              Admin
            </router-link>
            <div class="nav-link" v-else disabled > 
              Admin
            </div>

          </li>
          <li class="nav-item dropup">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Social
              activities</a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/Chat">
                  Chat
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/Forum">
                  Forum
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/News">
                  News
                </router-link>
              </li>
            </ul>
          </li>
          <li>

            <div class="logout" >
              <button type="button" id="logout_btn" class="btn btn-dark" v-if="!showLogout_btn" disabled >unlogged</button>
              <button type="button" id="logout_btn" class="btn btn-dark" v-if="showLogout_btn" @click="logout">logout</button>

            </div>

          </li>
        </ul>
      </div>
    </div>
  </nav>
  

</template>

<script setup>
import {useUserStore} from '@/store/UserStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const userStore = useUserStore();

let showLogout_btn = false;
let activeAdminLink = false;

function logout(){
      userStore.token = '';
      userStore.userId = '';
      userStore.expiresIn = 0;
      userStore.lastLogin = '';
      userStore.msg='';
      showLogout_btn = false;
      router.push('/'); 
  };

showLogout_btn = computed(() => {
  return userStore.is_authenticated;
});
activeAdminLink = computed(() => {
  return userStore.is_admin;
});

/* router.beforeEach((to)=>{

  const userStore = useUserStore();
  showLogout_btn = userStore.is_authenticated;
  console.log ('is_Auth on route before ?:' + userStore.is_authenticated );

});
 */

</script>
  
<style>
.img-fluid25 {
  max-width: 33%;
}
</style>
