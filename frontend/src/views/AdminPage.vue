<template>

  <div class="table-md" >
    <table class="table table-striped table-bordered table-hover table-sm">
      <thead class="thead-dark">
        <tr>
          <th scope="col">UserId</th>
          <th scope="col">UserLogin</th>
          <th scope="col">UserPassword</th>
          <th scope="col">UserService</th>
          <th scope="col">UserMailPro</th>
          <th scope="col">Action Permission</th>
          <th scope="col">Action hierarchie</th>
          <th scope="col">Allow Suppr</th>
          <th scope="col">Allow Change</th>
          <th scope="col">Date Creation Permission</th>
          <th scope="col">Dates Update Permissions</th>

        </tr>
      </thead>
      <tbody>
        <tr class="lign" v-for="user in adminScreen">
          <td>
            {{user.UserId}}
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.UserLogin" @change="adminStore.updateCell({UserLogin : user.UserLogin, UserId : user.UserId, token:userStore.token})">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.UserPassword">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.UserService">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.UserMailPro">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.ActionDroit">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.NiveauDroit">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.AllowSuppr">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.AllowChange">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.DateCreaDroit">
          </td>
          <td>
            <input type="text" class="userLign" v-model="user.DateModifDroit">
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div id="userSum">sum</div>

          </td>

        </tr>
      </tfoot>
    </table>
  </div>


</template>

<script setup>

import { useAdminStore } from '@/store/adminStore';
import { useUserStore } from '@/store/UserStore'
import { reactive } from 'vue';

const Query = require('@/components/genericQuery');

//pinia Storage access

const adminStore = useAdminStore();
const userStore = useUserStore();

let adminScreen = reactive({});
adminScreen = adminStore.table;

/*
  get admin data
*/
adminStore.get(userStore.token);




</script>

<style >
.table-md {
  max-width : 8px; 
}

</style>