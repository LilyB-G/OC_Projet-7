// requeteur
export function dbReq(database,Sqlreq) {
    return new Promise((resolve, reject) => {
        database.query(req, function (err, result) {
            if (err) {
                return (err);
            };
            console.log(result);
            resolve(result);
       //     bdd.end();
        });
    });
};
