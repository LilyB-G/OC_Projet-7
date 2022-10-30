<template>

    <div class="table-md">
        <table class="table table-striped table-bordered table-hover table-sm">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">UserId</th>
                    <th scope="col">UserLogin</th>
                    <th scope="col">UserPassword</th>
                    <th scope="col">Service</th>
                    <th scope="col">Role</th>
                    <th scope="col">UserMailPro</th>
                    <th scope="col">Context Permission</th>
                    <th scope="col">Date Create Permission</th>
                    <th scope="col">Dates Update Permissions</th>

                </tr>
            </thead>
            <tbody>
                <tr class="lign" v-for="(user,index) in filtered">
                    <td>
                        {{index}}
                    </td>
                    <td>
                        {{user.UserId}}
                    </td>
                    <td>
                        <input type="text" class="userLign" v-model="user.UserLogin"
                        @change="adminStore.updateCell({UserLogin : user.UserLogin, UserId : user.UserId, token:userStore.token})">
                    </td>
                    <td>
                        <textarea type="text" class="userLign-password" disabled>{{user.UserPassword}}</textarea>
                    </td>
                    <!-- ----------------------------------------  Service --------------------------------------- -->
                    <td>
                        <div class="btn-group dropend">
                            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            (+)
                        </button>
                        <ul class="dropdown-menu">
                            <li v-for="param in params">
                                <button class="dropdown-item" type="button"
                                v-if="(param.Component == 'DesckAdminPage' && param.Utilisation.includes('Service') &&  (user.UserService == undefined || !user.UserService.includes(param.Design)))"
                                @click="addService(param.Design,index)">{{param.Design}}
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="btn-group dropend" v-if="(user.UserService != undefined)">
                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    (-)
                </button>
                <ul class="dropdown-menu">
                    <li v-for="param in params">
                        <button class="dropdown-item" type="button"
                        v-if="(param.Component == 'DesckAdminPage' && param.Utilisation.includes('Service') && user.UserService.includes(param.Design) )"
                        @click="removeService(param.Design,index)">{{param.Design}}
                    </button>
                </li>
            </ul>
        </div>
        <div type="text" class="userLign">{{user.UserService}}</div>

    </td>

    <!-- ----------------------------------------  Role --------------------------------------- -->
    <td>
        <div class="btn-group dropend">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            (+)
        </button>
        <ul class="dropdown-menu">
            <li v-for="param in params">
                <button class="dropdown-item" type="button"
                v-if="(param.Component == 'DesckAdminPage' && param.Utilisation.includes('Groupomania') &&  (user.UserRole == undefined || !user.UserRole.includes(param.Design)))"
                @click="addRole(param.Design,index)">{{param.Design}}
            </button>
        </li>
    </ul>
</div>
<div class="btn-group dropend" v-if="(user.UserService != undefined)">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
    data-bs-toggle="dropdown" aria-expanded="false">
    (-)
</button>
<ul class="dropdown-menu">
    <li v-for="param in params">
        <button class="dropdown-item" type="button"
        v-if="(param.Component == 'DesckAdminPage' && param.Utilisation.includes('Groupomania') && user.UserRole.includes(param.Design) )"
        @click="removeRole(param.Design,index)">{{param.Design}}
    </button>
</li>
</ul>
</div>
<div type="text" class="userLign">{{user.UserRole}}</div>

</td>
<!-- --------------------------- UserMailPro ------------------------- -->
<td>
    <div class="userLign">{{user.UserMailPro}}</div>
</td>
<!-- --------------------------- Context ------------------------- -->
<td>
    <div class="btn-group dropend">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
        data-bs-toggle="dropdown" aria-expanded="false">
        (+)
    </button>
    <ul class="dropdown-menu">
        <li v-for="li in allowed_Context">
            <button class="dropdown-item" type="button"
            v-if="user.NiveauDroit == null || !user.NiveauDroit.includes(li)"
            @click="addCtxPerm(li,index)">{{li}}
        </button>
    </li>
    <li>
        <button class="dropdown-item" type="dropdown-divider">
        </button>
    </li>
    <li>
        <button class="dropdown-item" type="button">
            add new entrie
        </button>
    </li>
</ul>
</div>
<div class="btn-group dropend">
    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
    data-bs-toggle="dropdown" aria-expanded="false">
    (-)
</button>
<ul class="dropdown-menu">
    <li v-for="li in allowed_Context">
        <button class="dropdown-item" type="button"
        v-if="user.NiveauDroit != null && user.NiveauDroit.includes(li)"
        @click="removeCtxPerm(li,index)">{{li}}
    </button>
</li>
<li>
    <button class="dropdown-item" type="dropdown-divider">

    </button>
</li>
<li>
    <button class="dropdown-item" type="button">
        update/remove entrie
    </button>
</li>
</ul>
</div>
<div>
    <table class="table table-striped"
    v-if="user.NiveauDroit != null && user.NiveauDroit.includes('_')">
    <thead>
        <tr>
            <th scope="col">Context</th>
            <th scope="col">Permissons</th>
        </tr>
    </thead>
    <tbody v-for="obj of filtered">
        <!-- {{index}}|{{filtered.indexOf(obj)}} -->
        <tr v-if="((obj.IdUser == user.UserId || obj.IdUser == null) && obj.NiveauDroit != null) && index == filtered.indexOf(obj) " v-for="droit of obj.NiveauDroit.split(',')" >
            <td class="cellDroit" >
                {{droit}}
            </td>
            <td>
                <table class="table table-bordered">
                    <tr v-for="chk of chkBxList">
                        <td class="chkBox_area"> 
                            <label for="checkbox">{{chk.Name}} {{contains(obj.ActionDroit,chk.Name)}} </label>                                                        
                            <input  
                            v-if="contains(obj.ActionDroit,chk.Name)" 
                            checked type="checkbox" class="checkbox"  id="checkbox"
                            v-model="chkBx" :value= "user.UserId + ',' + chk.Name" 

                            @change="eventChkBx(user.UserId,obj.NiveauDroit)">
                            <input 
                            v-else
                            type="checkbox" class="checkbox"  id="checkbox"
                            v-model="chkBx" :value="user.UserId + ',' + chk.Name" 

                            @change="eventChkBx(user.UserId,obj.NiveauDroit)">

                        </td>

                    </tr>
                </table>
            </td>
        </tr>
    </tbody>
</table>
</div>

<input type="checkbox" class="form-check-input" v-model="user.AllowSuppr"> Suppr
<input type="checkbox" class="form-check-input" v-model="user.AllowChange"> Change

</td>

<td>
    <div type="text" class="userLign">{{user.DateCreaDroit}}
    </div>
</td>
<td>
    <div type="text" class="userLign">{{user.DateModifDroit}}
    </div>
</td>
</tr>
</tbody>
<tfoot>
    <tr>
        <td>
            <div id="userSum">{{table.length}}</div>

        </td>

    </tr>
</tfoot>
</table>
</div>


</template>

<script setup>

    import { useAdminStore } from '@/store/adminStore';
    import { useUserStore } from '@/store/UserStore'
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

//pinia Storage access

const adminStore = useAdminStore();
const userStore = useUserStore();

const { table, params, allowed_Context, filtered } = storeToRefs(adminStore);

/*
    get admin data
    */
    adminStore.get(userStore.token);


    const refresh = (id, key , value)=> {
        
        Object.assign(adminStore.filtered[id], { [key] : value })
        console.log(id +'|' + key + ',' + adminStore.filtered[id][key]);
    };

    const addService = (payload, key) => {
        let array = [];
        if (adminStore.filtered[key].UserService != '') {
            array = adminStore.filtered[key].UserService.split(',')
        };
        array.push(payload);
        let toString = array.toString();
        adminStore.updateCell({ UserService: toString, UserId: adminStore.filtered[key].UserId, token: userStore.token }, 'User');
        refresh(key, 'UserService', toString);
    };
    const removeService = (payload, key) => {
        let array = [];
        if (adminStore.filtered[key].UserService != '') {
            array = adminStore.filtered[key].UserService.split(',')
        };
        let filtered = array.filter((roll) => roll != payload);
        let toString = filtered.toString();
        adminStore.updateCell({ UserService: toString, UserId: adminStore.filtered[key].UserId, token: userStore.token }, 'User');
        refresh(key, 'UserService', toString);

    };

    const addRole = (payload, key) => {

        let array = [];
        if (adminStore.filtered[key].UserRole != '') {
            array = adminStore.filtered[key].UserRole.split(',');
        };
        array.push(payload);
        let toString = array.toString();
        adminStore.updateCell({ UserRole: toString, UserId: adminStore.filtered[key].UserId, token: userStore.token }, 'User');
        refresh(key, 'UserRole', toString);
    };
    const removeRole = (payload, key) => {
        let array = [];
        if (adminStore.filtered[key].UserRole != '') {
            array = adminStore.filtered[key].UserRole.split(',');
        };
        let filtered = array.filter((roll) => roll != payload);
        let toString = filtered.toString();
        adminStore.updateCell({ UserRole: toString, UserId: adminStore.filtered[key].UserId, token: userStore.token }, 'User');

        refresh(key, 'UserRole', toString);
    };

    const addCtxPerm = (payload, key) => {
        let niveauDroitUser = adminStore.filtered[key].NiveauDroit;
        let array = [];
        
        if ( !niveauDroitUser == null ){
            if ( niveauDroitUser.length > 0 ) {
                array = niveauDroitUser.split(',');
            };
        };

        if (niveauDroitUser == null || !niveauDroitUser.split(',').includes(payload)){
            array.push(payload);
            console.log('addCtxPerm:' + key + ',' + payload);
            let toString = array.toString(); // tableau sous forme de chaine de caractère car nécessaire pour stockoge dans mysql

            //adminStore.updateCell({ NiveauDroit: toString, IdUser: adminStore.table[key].UserId, token: userStore.token }, 'Droit');
            refresh(key, 'NiveauDroit', toString);
        };
    };



    const removeCtxPerm = (payload, key) => {
        let array = [];
        if (adminStore.table[key].NiveauDroit.length > 0) {
            array = adminStore.table[key].NiveauDroit.split(',')
        };
        let filtered = array.filter((roll) => roll != payload);
        let toString = filtered.toString();
        //adminStore.updateCell({ NiveauDroit: toString, IdUser: adminStore.table[key].UserId, token: userStore.token }, 'Droit');
        refresh(key, 'NiveauDroit', toString);

    };
// stockage des états de checkBox droits User
const chkBx = ref([]);

const contains = (array,value) => {
    if ( array != null ){
        return array.split('|').includes(value);
    }else
    {
        return false;
    }
};


const chkBxList = [  // liste des choix de checkBox droit User pour construction dynamique
{
    "Id": '1',
    "Name": 'Create',

},
{
    "Id": '2',
    "Name": 'Update',

},
{
    "Id": '3',
    "Name": 'Delete',

},
{
    "Id": '4',
    "Name": 'Moderation',

},
];

const eventChkBx = (Id,context) => {

    const data = {};

    // chercher l'id droits pour userId et actiondroit connus

    //console.log('Id:' + Id + ', context:' + context);
    console.log(chkBx);

    let utilArray = [];
    let array = [];

    for (let item of chkBx.value){
        array = item.split(',');
        if (array[0] == Id){
            utilArray.push(array[1]);
        };
    }
//console.log (utilArray);

Object.assign(data, {
    'IdUser': Id,
    'arrayActionDroit': utilArray,
    'NiveauDroit': context,
});
console.log (data);
   adminStore.setDroits(data, userStore.token) // insert or update send to back


};



</script>

<style >
    .table-md {
        max-width: 8px;
    }

    .checkbox {
        text-align: center;

    }

    .cellDroit {
        text-align: center;
        vertical-align: middle;
    }

    .userLign-password {
        font-size: 10px;
        justify-content: center;
        max-width: 200px;
    }
</style>