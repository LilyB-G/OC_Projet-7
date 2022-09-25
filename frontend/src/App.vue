<template>
  <NavBar />

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import NavBar from '@/views/NavBar.vue';
import { mapState } from 'vuex';
import { AUTO_LOGIN_ACTION } from '@/store/storeconstants';



export default {
  name: 'App',

  computed: {
    ...mapState({
      autoLogout: (state) => state.auth.autoLogout,
    }),
  },

  watch: {
    autoLogout(curValue, oldValue) {
      if (curValue && curValue != oldValue) {
        this.$router.replace('/');
      }
    },
  },


  components: {
    NavBar,


  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
};

</script>

<style>
body {
  background-color: #d0cedc;
}
</style>













