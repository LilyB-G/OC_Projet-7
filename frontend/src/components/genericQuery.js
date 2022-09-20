const Axios = require('axios');

// obj as req.body object
// routeToBack as router back ex: '/thread:' + idpost

exports.postQuery = function(obj, routeToBack,Method,store) {

    let toUrl = 'http://localhost:3000' + routeToBack;
    let axiosConfig = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + store.state.auth.token,
            "Access-Control-Allow-Origin": "*",
            "method": Method,

        }
    };

    //console.log(toUrl + ' | ' + JSON.stringify(data) + ' | ' + JSON.stringify(axiosConfig.headers));

    if (store.state.auth.token) {

       const response =  Axios.post(toUrl, obj, axiosConfig)
       return response;     
    }

};
