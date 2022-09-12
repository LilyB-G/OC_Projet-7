//import { createStore } from "vuex";
//import auth from '@/components/auth';
import { mutations } from '@/components/auth';
import {actions} from '@/components/auth';
import {getters} from '@/components/auth';

//à reprendre

// Create store
export default {
    namespaced: true,
    state() {
        return {
            token: '',
            email: '',
            userId: '',
            refreshToken: '',
            expiresIn: '24h',
            autoLogout: false,
        };
    },
    mutations,
    getters,
    actions,
  };