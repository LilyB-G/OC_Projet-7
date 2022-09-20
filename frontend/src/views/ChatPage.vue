<template>

    <div class="container-sm">
        <div class="form-floating mt-3">
            <!-- <div contenteditable="true" class = "form-group" data-text="..."> 
                <textarea class="form-control px-1" v-model="text" >{{text}}</textarea>
            </div> -->
            <div contenteditable="true" class="form-control py-3">
                <Custom v-model="text" @change="log"/>
                               
            </div>
        </div>
        <div class="d-flex">
            <button type="button" class="btn btn-secondary mt-2 ms-auto" @click="insert">Envoyer</button>
            <label for="file-input" class="btn btn-danger mt-2">Ajouter un fichier</label>
            <input id="file-input" type="file" class="d-none" />
        </div>
        <hr>
    </div>

    <ThreadPage></ThreadPage>
    <router-view />

</template>
  
<script>
import { updateExpression } from '@babel/types';
import ThreadPage from './ThreadPage.vue';
const Query = require('@/components/genericQuery');

export default {
    data() {
        return {
            chatSelect: {},
            chat: {},
            userId: {},
            text: '',
        }
    },
    props:{
        text:{
            type:String,
            default:'',
        }
    },
    components: {
        ThreadPage
    },
    provide() {
        return {
            chat: this.chat,


        }
    },
    mounted() {

        //console.log('hook : mounted');
        const obj = {};
        const routeToBack = '/chat/ini';
        const Method = 'post';

        const response = Query.postQuery(obj, routeToBack, Method, this.$store);
        if (response.status == 200) {
            this.chat = response.data;
            Object.assign(this.chatSelect, this.chat);
        } else if (response.status != 200) {
            console.log(response.status);
        }
        else {
            console.log(response);
        }




    },

    computed: {

    },
    methods: {

        insert() {
            const obj = {};
            const routeToBack = '/sendpost'
            Query.postQuery(obj, routeToBack, Method, this.$store);
            if (response.status == 200) {
                this.chat = response.data;
                Object.assign(this.chatSelect, this.chat);
            } else if (response.status != 200) {
                console.log(response.status);
            }
            else {
                console.log(response);
            }
        },
        update() {
            const obj = {};
            const routeToBack = '/sendpost'
            Query.postQuery(obj, routeToBack, Method, this.$store);
            if (response.status == 200) {
                this.chat = response.data;
                Object.assign(this.chatSelect, this.chat);
            } else if (response.status != 200) {
                console.log(response.status);
            }
            else {
                console.log(response);
            }

        },
        log(){
            console.log(this.text);
        }
    




    },
}


</script>
  
<style scoped>
.form-floating>.form-control {
    height: auto;
    min-height: 5rem;
}

.form-control>div.form-control:empty:not(:focus)::before {
    content: attr(data-text);
    color: #a0a0a0;
    display: block;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}
</style>