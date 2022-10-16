const Axios = require('axios');
import { useChatStore } from '@/store/chatStore';
import { useUserStore } from '@/store/UserStore';



// obj as req.body object
// routeToBack as router back ex: '/thread:' + idpost

export const postQuery = function (obj, routeToBack, Method) {

    const chatStore = useChatStore(); // pinia chat Store
    const userStore = useUserStore(); // pinia user Store

    if (chatStore.length > 0) {
        const token = chatStore.token;
        if (token.length > 0) {

            let toUrl = routeToBack;
            let axiosConfig = {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token,
                    "Access-Control-Allow-Origin": "*",
                    "method": Method,
                    
                }
            };
            const response = Axios.post(toUrl, obj, axiosConfig)
            return response;
        }
        return alert('unauthorized user auth');
    }
};
export const adminQuery = function (obj, routeToBack, Method) {

    
    const userStore = useUserStore(); // pinia user Store

        const token = userStore.token;
        if (token.length > 0) {

            let toUrl = routeToBack;
            let axiosConfig = {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + token,
                    "Access-Control-Allow-Origin": "*",
                    "method": Method,
                    
                }
            };
            const response = Axios.post(toUrl, obj, axiosConfig)
            return response;
        }
        return alert('unauthorized user auth');

};