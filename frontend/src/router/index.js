import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/store';
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeconstants';
import homePage from '@/views/HomePage.vue';
import notFound from "@/views/notFound.vue";
import newsPage from "@/views/NewsPage.vue";
import chatPage from "@/views/ChatPage.vue";
import forumPage from "@/views/ForumPage.vue";
import adminPage from "@/views/AdminPage.vue";
import userPage from "@/views/UserPage.vue";
import loginPage from "@/components/LoginPage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
                {
            path: '/',
            name: "Root",
            component: homePage,
            meta: { auth:false },
        },
        {
            path: '/home',
            name: "HomePage",
            component: homePage,
            meta: { auth:false },
        },
        {
            path: '/notFound',
            name: "notFound",
            component: notFound,
            meta: { auth:false },
        },
        {
            path: '/News',
            name: "NewsPage",
            component: newsPage,
            meta: { auth:false },
        },

        // rest of the code ...
        {
            path: '/Chat',
            name: "ChatPage",
            component: chatPage,
            meta: { auth:true },
        },
        {
            path: '/Forum',
            name: "ForumPage",
            component: forumPage,
            meta: { auth:true },
        },
        {
            path: '/Admin',
            name: "AdminPage",
            component: adminPage,
            meta: { auth:true },
        },
        {
            path: '/User',
            name: "UserPage",
            component: userPage ,
            meta: { auth:true },
        },
        {
            path: '/Login',
            name: "LoginPage",
            component: loginPage,
            meta: { auth:false },
        }

    ]
});
router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login'); // un profil non authentifié est dirigé sur la page login si tentative d'accès à une page exigeant une authentification
    } else if (
        
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        //console.log('to.meta: ' + to.meta.auth + ' | ' + store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`] );
        next();      // pour le moment une authentification réussie envoie sur la page User
    } else {
        next();
    }
});

export default router;






