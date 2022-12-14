
import { defineStore } from 'pinia'

import Axios from 'axios';
import router from '@/router/index';


export const useUserStore = defineStore({

    id: 'user',
    state: () => ({
        token: '',
        userId: '',
        expiresIn: 0,
        autoLogout: false,
        errors: '',
        lastLogin: '',
        msg: '',
        timer: '',
        admin: '',
    }),

    actions: {


        login(payload) {
            const payloadUrl = `http://localhost:3000/auth/login`;
            const postData = {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            };
            const promise = Axios.post(payloadUrl, postData)
            promise.then((result) => {
                //console.log (result);

                if (result.status === 200) {

                    this.msg = 'authentication successes';
                    this.expiresIn = result.data.expiresIn * 1000;
                    this.token = result.data.token;
                    this.userId = result.data.userData.UserId;
                    this.lastLogin = result.data.userData.UserLastLogin;
                    try {
                        const strToArray = result.data.userData.UserRole.split(',');


                        if (strToArray.find(str => str == 'Admin') ) {
                            this.admin = true;
                        };
                    } catch { };
                    const from = router.currentRoute.value.redirectedFrom.fullPath 
                    router.push(from);
                };
                if (result.status === 500) {
                    msg = "incorrect request";
                    return { 'msg': msg, 'token': '' };
                }
                if (result.status in ['400', '401', '402']) {
                    msg = "incorrect authentication"
                    return { 'msg': msg, 'token': '' };

                }
                return { token: '' };
            });

        },
        signup(payload) {
            const payloadUrl = `http://localhost:3000/auth/signup`

            const postData = {
                email: payload.email,
                password: payload.password,
                name: payload.name,
                returnSecureToken: true,
            };
            const promise = Axios.post(payloadUrl, postData)
            promise.then((result) => {
                console.log(result);

                if (result.status === 200) {

                    this.msg = 'authentication successes';
                    this.expiresIn = result.data.expiresIn * 1000;
                    this.token = result.data.token;
                    this.userId = result.data.userData.UserId;
                    this.lastLogin = result.data.userData.UserLastLogin;

                    router.push('/User');

                };
                if (result.status === 500) {
                    msg = "incorrect request";
                    return { 'msg': msg, 'token': '' };
                }
                if (result.status in ['400', '401', '402']) {
                    msg = "incorrect authentication"
                    return { 'msg': msg, 'token': '' };

                }
                return { token: '' };
            });
        },

        logout() {
            this.token = '';
            this.userID = '';
            this.expiresIn = 0;
            this.timer = 0;
            router.replace('/');
        },
        auto_logout() {
            // stuff
            logout();
        },

    },
    getters: {
        user_token: (state) => {
            return state.token;
        },
        is_authenticated: (state) => {
            if (state.token == '') {
                return false;
            }
            return true;

        },
        is_admin: (state) => {
            if (state.admin == '') {
                return false;
            }
            return true;
        },
        timeBeforeLogout: (state) => {                    // back count session activity 

            state.timer = setTimeout(() => {
                () => {
                    state.token = '';
                    state.userID = '';
                    state.expiresIn = 0;
                    state.timer = 0;
                    router.replace('/');
                }
            }, state.expiresIn);

        }

    },

});

