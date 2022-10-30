import { defineStore } from 'pinia'
import Axios from 'axios';
import groupValue from '@/components/adminStoreFunct'

const Query = require('@/components/genericQuery');



export const useAdminStore = defineStore({

    id: 'Admin',
    state: () => ({
        table: {},
        filtered: {},
        params: {},
        ctxperm: [],
        allowed_Context: [],

    }),
    actions: {
        updateCell(payload, table) {

            const toUrl = `http://localhost:3000/admin/updatetable`;

            const data = payload;
            // console.log(payload);
            const axiosConfig = {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + payload.token,
                    "Access-Control-Allow-Origin": "*",

                }
            };

            if (payload.token) {

                Axios.post(toUrl, data, axiosConfig)
                    .then((res) => {
                        if (res.status == 200) {
                            console.log('update successfull');
                        }
                        else if (res.status in ['400', '401', '402']) {
                            console.log('unauthorized');
                        }
                        else {
                            console.log(res.status);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }
            else {
                console.log('error ' + 'unautorized');
            };


        },
        get(token) {
            const data = {};
            let toUrl = 'http://localhost:3000/admin/gettable';
            const axiosConfig = {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token,
                    "Access-Control-Allow-Origin": "*",

                }
            };

            if (token) {

                Axios.post(toUrl, data, axiosConfig)
                    .then((res) => {
                        if (res.status == 200) {
                            console.log('gettabble ok');
                            //charger nouvelles valeurs
                            Object.assign(this.table, res.data.data);   // copie dans store

                            //console.log(groupValue(res.data.data))
                            this.filtered = groupValue(res.data.data); // filtered table

                        }
                        else if (res.status in ['400', '401', '402']) {
                            console.log('unauthorized');

                        }
                        else {
                            console.log(res.status);

                        }
                    })
                    .catch((err) => {
                        console.log(err);

                    })
                // ---------- chercher les parametres

                toUrl = 'http://localhost:3000/admin/getparams';

                Axios.post(toUrl, data, axiosConfig)
                    .then((res) => {
                        if (res.status == 200) {

                            Object.assign(this.params, res.data.data);   // copie dans store

                        }
                        else if (res.status in ['400', '401', '402']) {
                            console.log('unauthorized');

                        }
                        else {
                            console.log(res.status);

                        }
                    })
                    .catch((err) => {
                        console.log(err);

                    })
            }
            else {
                console.log('error ' + 'unautorized');
                return false
            };
        },
        
    
        setDroits(data, token) {
            
            let toUrl = 'http://localhost:3000/admin/setDroits';
            const axiosConfig = {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token,
                    "Access-Control-Allow-Origin": "*",
    
                }
            };
    
            if (token) {
                Axios.post(toUrl, data, axiosConfig)
                    .then((res) => {
                        if (res.status == 200) {
    
                           // console.log(res.msg);   // retour objet
    
                        }
                        else if (res.status in ['400', '401', '402']) {
                            
                            console.log('unauthorized');
    
                        }
                        else {
                            console.log(res.status);
    
                        }
                    })
                    .catch((err) => {
                        console.log(err);
    
                    })
            }
            else {
                console.log('error ' + 'unautorized');
                return false
            };
    
    
        },

    },

    

    getters: {
        iniCtxPerm: (state) => {
            let temp = ''
            for (let i in state.params) {

                if (state.ctxperm.length === 0) {
                    state.ctxperm.push(state.params[i].Utilisation);
                    temp = state.params[i].Utilisation;
                    if (temp.includes('_')) {
                        state.allowed_Context.push(temp);
                    }
                } else {
                    if (!state.ctxperm.includes(state.params[i].Utilisation)) {
                        temp = state.params[i].Utilisation;
                        state.ctxperm.push(temp);
                        if (temp.includes('_')) {
                            state.allowed_Context.push(temp);
                        }
                    };

                };

                //console.log('allowed: ' + state.allowed_Context);

            };

        },
        
    }

});