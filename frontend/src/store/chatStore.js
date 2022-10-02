
import { defineStore } from 'pinia'
import { yearMonthDateTime } from '@/services/dateTime'

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
    }),
    actions: {

        closeShowForm() {
            this.showForm = false;
        },
        postInsert() {
            const obj = {
                data: {
                    content: this.content,
                    userId: this.userId,
                    files: this.files,
                    dateCreation: yearMonthDateTime(),

                },
            };
            const routeToBack = '/createPost';
            const Method = 'POST';

            console.log(obj);
            const response = Query.postQuery(obj, routeToBack, Method);
            if (response) {
                if (response.status == 200) {
                    console.log(response.status);
                } else if (response.status != 200) {
                    console.log(response.status);
                }
                else {
                    console.log(response);
                }
            };

        },
        postUpdate() {
            const obj = {
                content: this.content,
                files: this.files,
            };
            const routeToBack = '/updatePost';
            const Method = 'POST';

            //console.log(obj);
            const response = Query.postQuery(obj, routeToBack, Method);
            if (response.status == 200) {
                console.log(response.status);
            } else if (response.status != 200) {
                console.log(response.status);
            }
            else {
                console.log(response);
            }


        },
        actualRoute(path) {
            this.routePath = path;
            console.log(this.routePath);
        }

    },
    getters: {
        postAction: (state) => {
            if (state.action == 'update' || state.action == 'create') {
                state.showForm = true;

            } else {
                state.showForm = false;
            };
            return state.showForm;
        },
        postContent: (state) => {
            if (state.ori != '') {
                state.content = state.ori;
            }
        },

    }
});

