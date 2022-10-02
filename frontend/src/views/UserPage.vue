<template>

  <div class="container">
    <div class="main-body">
      <!-- Breadcrumb -->
      <!-- <nav aria-label="breadcrumb" class="main-breadcrumb">
               <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li> 
                  <li class="breadcrumb-item active" aria-current="page">User Profile</li>
               </ol>
            </nav> -->
      <!-- /Breadcrumb -->
      
      <div class="row gutters-sm">
        <div class="col-md-12 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle"
                  width="150">
                <div class="mt-3">
                  <h4>{{user.UserLogin}}</h4>
                  <p class="text-secondary mb-1">
                    <hr>
                  </p>
                  <p class="text-muted font-size-sm">
                  <div class="role" >{{user.UserService}}</div>
                  <div class="lastLogin">last login: {{heureMin(user.UserLastLogin)}}</div>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Name
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" v-model="user.UserLogin" >

                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Email Pro
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">{{user.UserMailPro}} used as login
                </div>

              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Email Perso
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" v-model="user.UserMailPerso" >
                </div>
              </div>

              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Phone Pro
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" v-model="user.UserPhonePro" >
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">
                    Phone Perso
                  </h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" v-model="user.UserPhonePerso" >
                </div>
                <hr>
                <div class="row align-items-start">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Address</th>
                        <th scope="col" style="width:10%"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>

                        </td>
                        <td>
                          Rue
                        </td>
                        <td>
                          <input type="text" style="width:95%" v-model="user.UserRue" >
                        </td>
                      </tr>
                      <tr>
                        <td>

                        </td>
                        <td>
                          Code postal
                        </td>
                        <td>
                          <input type="text" v-model="user.UserCodePostal" >
                        </td>

                      </tr>
                      <tr>
                        <td>

                        </td>
                        <td>
                          Ville
                        </td>
                        <td>
                          <input type="text" v-model="user.UserVille" >
                        </td>

                      </tr>

                    </tbody>
                  </table>

                </div>
              </div>
            </div>
            <hr>
            <div class="row ">
              <div class="btn btn-dark" v-if="showUpdateBtn.active" @click="updateValue(updateUser)">
                      Update                
              </div>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>

</template>
   
<script setup>
import Axios from 'axios';
import { useUserStore } from '@/store/UserStore';

import { ref, watch, reactive } from 'vue';
import { heureMin } from '@/services/dateTime'

const userStore = useUserStore();


const userSelect = {};
const user = reactive({});
const updateUser = {};


const showUpdateBtn = reactive({active:false});

/*
  get user data
*/  

  const toUrl = 'http://localhost:3000/auth/getuser';
  const data = {};                                            // pas de data envoyé pour un select
  const axiosConfig = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": 'Bearer ' + userStore.token,
      "Access-Control-Allow-Origin": "*",
      
    }
  };
  if (userStore.token) {    
     
          Axios.post(toUrl, data, axiosConfig)
              .then ((res) => {
                  if(res.status == 200){
                    //console.log (res.data);
                    Object.assign(user,res.data.data);
                    Object.assign(userSelect, res.data.data);   // copie originale
                    //console.log (user.UserLogin) ;
                  }
                  else if (res.status in ['400','401','402']) {
                    console.log ( 'unauthorized');
                  }
                  else
                  {
                    console.log ( 'other error');
                  }
              })
              .catch((err) => {
                console.log (err);
              })   
    
  } 
  else 
  {
    console.log('error ' + 'unautorized');
  };



const updateValue = (obj) => {

  let toUrl = 'http://localhost:3000/auth/updateuser';
  let axiosConfig = {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": 'Bearer ' + userStore.token,
      "Access-Control-Allow-Origin": "*",
      
    }
  };

  //console.log(toUrl + ' | ' + JSON.stringify(data) + ' | ' + JSON.stringify(axiosConfig.headers));

  if (userStore.token) {

    Axios.post(toUrl, obj, axiosConfig)
      .then((response) => {
        //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
        if (response.status == 200) {
          //console.log(response.data);
          raz();

        } else {
          console.log('error ' + response.status);
        }
      })
      .catch((error) => {
        console.log(error);

      });
  }
};



const raz= () => {
    showUpdateBtn.active = false;   // gérer le retour à l'origine
    updateUser.length = 0;        // vider le array
};

watch(user,(currentValue,oldValue ) => {

  if (userSelect != currentValue){
    
    for (const obj of Object.entries(user)) {
      
      if ( obj[1] != [ 'userSelect.'+`$obj[0]`] && obj[0]!= 'UserLastLogin' && obj[1] != null){
        const newV = user[obj[0]];
        const oldV = userSelect[obj[0]];

        if ( newV != oldV ) {
          console.log ('key: '+ obj[0] + ' currentValue : ' + newV + ', oldvalue : ' + oldV );
          console.log (obj);
        showUpdateBtn.active = true;

        let Key = obj[0];
        let Val = obj[1];

        Object.assign(updateUser, { [Key] : Val });   // construction du tableau de mise à jour
        }
      };
      
    };

    console.log (updateUser);
  
  } else if (userSelect === currentValue) {
    raz();
  };
  
});



</script>
   
<style>
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}

.main-body {
  padding: 15px;
  margin-bottom: 20px;
}

.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, .125);
  border-radius: .25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm>.col,
.gutters-sm>[class*=col-] {
  padding-right: 8px;
  padding-left: 8px;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.h-100 {
  height: 100% !important;
}

.shadow-none {
  box-shadow: none !important;
}
</style>