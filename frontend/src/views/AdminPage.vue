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
                                    <tr v-if="obj.IdUser == user.UserId">
                                        <td class="cellDroit">{{obj.NiveauDroit}}
                                        </td>
                                        <td>
                                            <table class="table table-bordered">
                                                <tr v-for="chk of chkBxList">
                                                    <td>
                                                        {{chk.Name}}
                                                        <input type="checkbox" class="checkbox"
                                                            v-if="obj.ActionDroit.includes(chk.Name) " checked
                                                            v-model="chkBx" :value= "obj.IdUser + ',' + chk.Name"
                                                            @change="eventChkBx({'IdDroits' : obj.IdDroits,'NiveauDroit':obj.NiveauDroit,'IdUser':user.UserId})">
                                                        <input type="checkbox" class="checkbox" v-else 
                                                            v-model="chkBx" :value="obj.IdUser + ',' + chk.Name"
                                                            @change="eventChkBx({'IdDroits' : obj.IdDroits,'NiveauDroit':obj.NiveauDroit,'IdUser':user.UserId})">

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


const addService = (payload, key) => {
    let array = [];
    if (adminStore.table[key].UserService != '') {
        array = adminStore.table[key].UserService.split(',')
    };
    array.push(payload);
    let toString = array.toString();
    adminStore.updateCell({ UserService: toString, UserId: adminStore.table[key].UserId, token: userStore.token }, 'User');
    adminStore.refresh(key, 'UserService', toString);
};
const removeService = (payload, key) => {
    let array = [];
    if (adminStore.table[key].UserService != '') {
        array = adminStore.table[key].UserService.split(',')
    };
    let filtered = array.filter((roll) => roll != payload);
    let toString = filtered.toString();
    adminStore.updateCell({ UserService: toString, UserId: adminStore.table[key].UserId, token: userStore.token }, 'User');
    adminStore.refresh(key, 'UserService', toString);

};

const addRole = (payload, key) => {

    let array = [];
    if (adminStore.table[key].UserRole != '') {
        array = adminStore.table[key].UserRole.split(',');
    };
    array.push(payload);
    let toString = array.toString();
    adminStore.updateCell({ UserRole: toString, UserId: adminStore.table[key].UserId, token: userStore.token }, 'User');
    adminStore.refresh(key, 'UserRole', toString);
};
const removeRole = (payload, key) => {
    let array = [];
    if (adminStore.table[key].UserRole != '') {
        array = adminStore.table[key].UserRole.split(',');
    };
    let filtered = array.filter((roll) => roll != payload);
    let toString = filtered.toString();
    adminStore.updateCell({ UserRole: toString, UserId: adminStore.table[key].UserId, token: userStore.token }, 'User');
    adminStore.refresh(key, 'UserRole', toString);
};

const addCtxPerm = (payload, key) => {

    let array = [];
    if (adminStore.table[key].NiveauDroit != '' && adminStore.table[key].NiveauDroit != null) {
        array = adminStore.table[key].NiveauDroit.split(',')
    };
    array.push(payload);
    let toString = array.toString();
    adminStore.updateCell({ NiveauDroit: toString, IdUser: adminStore.table[key].UserId, token: userStore.token }, 'Droit');
    adminStore.refresh(key, 'NiveauDroit', toString);
};
const removeCtxPerm = (payload, key) => {
    let array = [];
    if (adminStore.table[key].NiveauDroit != '' && adminStore.table[key].NiveauDroit != null) {
        array = adminStore.table[key].NiveauDroit.split(',')
    };
    let filtered = array.filter((roll) => roll != payload);
    let toString = filtered.toString();
    adminStore.updateCell({ NiveauDroit: toString, IdUser: adminStore.table[key].UserId, token: userStore.token }, 'Droit');
    adminStore.refresh(key, 'NiveauDroit', toString);

};

const chkBx = ref([]   // stockage des états de checkBox droits User
    
);


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

const eventChkBx = (lines) => {

    const data = {};

    // chercher l'id droits pour userId et actiondroit connus

    console.log(lines);
    console.log(chkBx);

    Object.assign(data, {
        'IdDroits': lines.IdDroits,
        'IdUser': lines.IdUser,
        'ActionDroit': lines.ActionDroit,
        'NiveauDroit': lines.NiveauDroit,
    });

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