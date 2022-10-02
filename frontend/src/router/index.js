import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/UserStore';
import { useChatStore } from '@/store/chatStore';

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
            name: "/",
            component: homePage, meta: { auth:false },
        },
        {
            path: '/home',
            name: "HomePage",
            component: homePage, meta: { auth:false },
        },
        {
            path: '/notFound',
            name: "notFound",
            component: notFound, meta: { auth:false },
        },
        {
            path: '/News',
            name: "NewsPage",
            component: newsPage, meta: { auth:false },
        },

        // rest of the code ...
        {
            path: '/Chat',
            name: "ChatPage",
            component: chatPage, meta: { auth:true },
        },
        {
            path: '/Forum',
            name: "ForumPage",
            component: forumPage, meta: { auth:true },
        },
        {
            path: '/Admin',
            name: "AdminPage",
            component: adminPage, meta: { auth:true },
        },
        {
            path: '/User',
            name: "UserPage",
            component: userPage , meta: { auth:true },
        },
        {
            path: '/Login',
            name: "LoginPage",
            component: loginPage, meta: { auth:false },
        }

    ]
});
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const chatStore = useChatStore();

    /*
        ini var Store
    */
        //chatStore.actualRoute(to.path);
        //console.log(to.path);

    //console.log ('router before userStore.is_authenticated: ' + userStore.is_authenticated);
    //console.log ('router before to.meta.auth: ' + to.meta.auth);
    /*
                redirection 
   */
        if ( !userStore.is_authenticated && to.meta.auth == true )
        {
            next('/login'); // un profil non authentifié est dirigé sur la page login si tentative d'accès à une page exigeant une authentification
        } 
        else
        {
            next();
        }
    
}); 
router.afterEach((to,from,failure)=>{
    const userStore = useUserStore();

    //console.log ('router after userStore.is_authenticated: ' + userStore.is_authenticated);
    //console.log ('router after to.meta.auth: ' + to.meta.auth);

})

 
export default router;





