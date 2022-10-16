//import { defineStore } from 'pinia';
import { useChatStore } from "@/store/chatStore";
import { useUserStore } from "@/store/UserStore";
import { useAdminStore } from "@/store/adminStore";


export const useAllStore = {
    id: 'all',
    userStore: useUserStore,
    chatStore: useChatStore,
    adminStore: useAdminStore,
}; 