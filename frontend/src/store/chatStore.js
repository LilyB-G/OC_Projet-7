
import { defineStore } from 'pinia'
import { yearMonthDateTime } from '@/services/dateTime'
import Axios from 'axios';

const Query = require('@/components/genericQuery');


export const useChatStore = defineStore({

    id: 'post',
    state: () => ({
        content: '',
        ori: '',
        action: '',
        files: [],
        showForm: false,
        token: '',
        routePath: '',
        userId: '',
        userName: '',
        dateCreation: '',
        Chat:{},
        threadEdited:'',
    }),
    actions: {

        closeShowForm() {
            this.showForm = false;
        },

        get(token) {

            const data = {};
            const toUrl = 'http://localhost:3000/threads/allchat';
            const axiosConfig = {
              headers: {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + token,
                "Access-Control-Allow-Origin": "*",
                
              }
            };

            if (token) {

              Axios.post(toUrl, data, axiosConfig)
                .then((response) => {
                  //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
                  if (response.status == 200) {
                    //console.log(response.data);
                    
                    this.Chat = response.data;
          
                  } else {
                    console.log('error ' + response.status);
                  }
                })
                .catch((error) => {
                  console.log(error);
          
                });
            }

        },
        postInsert(token) {
            const data = {
                data: {
                    ThreadMessage: this.content,
                    idUser: this.userId,
                    ThreadFichiersJoints: this.files,
                    DateCreation : yearMonthDateTime(),
                    action: this.action,
                },
            };
            const toUrl = 'http://localhost:3000/threads/createpost';
            const axiosConfig = {
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": 'Bearer ' + token,
                  "Access-Control-Allow-Origin": "*",
                  
                }
              };

              if (token) {

                Axios.post(toUrl, data, axiosConfig)
                  .then((response) => {
                    //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
                    if (response.status == 200) {
                      //console.log(response.data);
                      alert('post created successfully')
                      this.action = '';
                      get(token); // recharger la page
            
                    } else {
                      console.log('error ' + response.status);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
            
                  });
              }

        },
        postUpdate(token,idThread) {
            const data = {
              ThreadMessage: this.content,
              ThreadFichiersJoints: this.files,
              IdThread : idThread,
              DateUpdate : yearMonthDateTime(),
                };
            const toUrl = 'http://localhost:3000/threads/updatepost';
            const axiosConfig = {
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": 'Bearer ' + token,
                  "Access-Control-Allow-Origin": "*",
                  
                }
              };

            //console.log(obj);
            if (token) {

                Axios.post(toUrl, data, axiosConfig)
                  .then((response) => {
                    //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
                    if (response.status == 200) {
                      //console.log(response.data);
                      alert('update send successfully')
                      this.action = '';
                      get(token); // recharger la page
                    } else {
                      console.log('error ' + response.status);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
            
                  });
              }



        },
        actualRoute(path) {
            this.routePath = path;
            console.log(this.routePath);
        }

    },
    getters: {
        postAction: (state) => {
            if (state.action.includes('update') || state.action == 'create') {
                state.showForm = true;

            } else {
                state.showForm = false;
            };
            return state.showForm;
        },
        postContent: (state) => {
            if (state.action == 'update') {
              const array = state.Chat.data;
              const currentThread = state.threadEdited;
              
              for (let obj of array){
                if (obj.IdThread == currentThread ){
                state.content = obj.ThreadMessage;
                };
              
            }
          }else{
            state.content = '';
          }
        },

    }
});

