<template>
    <div class="d-flex">
        <button type="button" class="btn btn-secondary mt-2 ms-auto" @click="update">Send</button>
    </div>
</template>

<script>

import {ref} from "vue";

export default {

        data(){
            return{
                Ref:ref(),
            }
        },
        props:{
            
        },
methods:{
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
        
    managefile(){

    },
}
}





        


</script>
<style>
</style>