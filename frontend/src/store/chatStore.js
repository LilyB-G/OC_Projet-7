
import { defineStore } from 'pinia'
import { yearMonthDateTime } from '@/services/dateTime'
import Axios from 'axios';

const Query = require('@/components/genericQuery');

export const useChatStore = defineStore({

  id: 'post',
  state: () => ({
    postAttr: {},
    ori: [],
    files: [],
    showForm: false,
    token: '',
    routePath: '',
    Chat: {},
    threadEdited: '',
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
              for (let i in response.data.data){
                              
                this.ori.push({ 
                  "IdThread" : response.data.data[i].IdThread ,
                   "ThreadMessage" : response.data.data[i].ThreadMessage 
                });
                
              };
              
            } else {
              console.log('error ' + response.status);
            }
          })
          .catch((error) => {
            console.log(error);

          });
      }
  },

  getFiles(token,IdThread){
    let toUrl = 'http://localhost:3000/threads/getFiles';
    
    const axiosConfig = {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + token,
        "Access-Control-Allow-Origin": "*",

      }
    };
    const data = {
      IdThread: IdThread,
    }

    if (token) {

      Axios.post(toUrl, data, axiosConfig)
        .then((response) => {
          //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
          if (response.status == 200) {
            //console.log(response.data);
            console.log('get images successfully');
            
          } else {
            console.log('error ' + response.status);
          }
        })
        .catch((error) => {
          console.log(error);

        });
    }

  },
  deleteFile(token,IdThread,IdFile){
    let toUrl = 'http://localhost:3000/threads/deleteFile';
    
    const axiosConfig = {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + token,
        "Access-Control-Allow-Origin": "*",

      }
    };
    const data = {
      IdThread: IdThread,
      idFichiersJoints: IdFile,
    };

    if (token) {

      Axios.post(toUrl, data, axiosConfig)
        .then((response) => {
          //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
          if (response.status == 200) {
            //console.log(response.data);
            console.log('get images successfully');
            
          } else {
            console.log('error ' + response.status);
          }
        })
        .catch((error) => {
          console.log(error);

        });
    }

  },
  addFile(token,IdThread){
    let toUrl = 'http://localhost:3000/threads/dropFile';
    
    const axiosConfig = {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + token,
        "Access-Control-Allow-Origin": "*",

      }
    };
    const data = {
      IdThread: IdThread,
    };

    if (token) {

      Axios.post(toUrl, data, axiosConfig)
        .then((response) => {
          //console.log("status:" + typeof (response.status) + " | data: " + JSON.stringify(response.data));
          if (response.status == 200) {
            //console.log(response.data);
            console.log('get images successfully');
            
          } else {
            console.log('error ' + response.status);
          }
        })
        .catch((error) => {
          console.log(error);

        });
    }

  },

  postForm( token ,data , action) {
    
    console.log(data);

    let toUrl = '';

    if (action == 'create' || action =='answer'){
      toUrl = 'http://localhost:3000/threads/createpost';
    };
    
    if (action == 'update'){
      toUrl = 'http://localhost:3000/threads/updatepost';
    }
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
            console.log('post ' + action + 'd successfully');
            

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
    if (state.postAttr.action == 'update' || state.postAttr.action == 'create' || state.postAttr.action == 'answer' ) {
      state.showForm = true;

    } else {
      state.showForm = false;
      
    };
    return state.showForm;
  },
  
}
});

