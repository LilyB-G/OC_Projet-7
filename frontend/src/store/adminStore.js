import { defineStore } from 'pinia'
import Axios from 'axios';

const Query = require('@/components/genericQuery');


export const useAdminStore = defineStore({

    id: 'Admin',
    state: () => ({
        table: {},

    }),
    actions: {
        updateCell(payload) {

            const toUrl = `http://localhost:3000/admin/updatetable`;
            const data = payload;
            console.log(payload);
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
                            alert('update succesfull')
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
            const toUrl = 'http://localhost:3000/admin/gettable';
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

                            Object.assign(this.table, res.data.data);   // copie dans store

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
        getters: {


        }

    }
});