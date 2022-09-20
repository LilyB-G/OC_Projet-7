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
            <router-link class="nav-link active" to="/Home">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/User">
              User
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link disabled" to="/Admin">
              Admin
            </router-link>
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

            <div class="logout" v-if="showLogout_btn">

              <button type="button" id="logout_btn" class="btn btn-dark" @click="onlogout">logout</button>

            </div>

          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapActions } from 'vuex';
import { AUTO_LOGOUT_ACTION } from '@/store/storeconstants';


export default {


  data() {
    return {
      userId: '',
      is_auth: false,
      showLogout_btn: false,
    }
  },

  methods: {
    ...mapActions('auth', {
      autoLogout: AUTO_LOGOUT_ACTION,
    }),
    onlogout() {
      console.log("exit login ok");

      this.autoLogout();
      this.showLogout_btn = false

    },
    showLogout() {
      if (localStorage.getItem('userData') !== 'null') {
        //console.log('spasse un truk')
        try {
          if (JSON.parse(localStorage.getItem('userData')).token.length > 0) {
            this.showLogout_btn = true;
            this.is_auth = true;
            this.userId = JSON.parse(localStorage.getItem('userData')).userId;
          }
        } catch (error) {
          this.showLogout_btn = false;
          this.is_auth = false;
          this.userId = '';
        }

      }

    }

  },


}

</script>
  
<style>
.img-fluid25 {
  max-width: 33%;
}
</style>
