 express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const date = require('../services/dateTime');
const dbquery = require('../services/dbAction');
const connection = require('../services/dbConnection');
require('bluebird');

function auth(req) {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        console.log('error token header');

        res.status(401).json({ msg: "Providing the token" });
    };

    const theToken = req.headers.authorization.split(' ')[1];
    //console.log(theToken);
    let decoded = jwt.verify(theToken, 'the-super-strong-secret');
    //console.log(decoded);
    return decoded;
};

// ------------------ get all posts

router.post('/allchat', (req, res, next) => {
    console.log('route allchat reached');
    if (auth(req).tokenid.length > 0) {

        const table1 = "Threads";
        const table2 = "Users";
        condition = ' Threads.IdUser = Users.UserId '; // toutes les ligne de la table thread
        orderBy = 'ORDER by Threads.IdThread DESC'

        dbquery.getJoinEntries(table1,table2, condition, orderBy)
            .then((resolve) => {
                const data = resolve;
                res.status(200).json({ msg: 'select returned', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});
// get one post
router.post('/onechat', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = 'IdUser = ' + "'" + req.ownerId + "'"; // le post créé par l'utilisateur identifié par userID
        col = '*';
        dbquery.getOneEntrie(col, table, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'select returned', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});

// -------------- update one post
router.post('/updatepost', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = 'IdThread = ' + req.body.IdThread; // id créé avec tokenid = hashed userPassword

        let data = '';
        let i = 0;

        for (let obj in req.body) {
            if (obj != 'IdThread' && obj != 'UserId') {
                let col = obj;
                let val = req.body[obj];

                if (i > 0) {

                    data = data + ' , ';
                }

                data = data + '\`' + col + '\`' + " = " + '\'' + val + '\'';
                i++;
            }
        }
        //console.log ('data: ' + data);

        dbquery.updateOneEntrie(table, data, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'update commited', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});

// ----------- create one post
router.post('/createpost', (req, res, next) => {
    
    //front send postForm( token ,userId ,IdThread ,message ,files, action)
    
    if (auth(req).tokenid.length > 0) {

        const table = "Threads";

        let i = 0;
        let col = '(';
        let val = '(';

//console.log(req.body);

        for (let obj in req.body) {
            if (obj != 'IdThread'&& obj != 'idFichiersJoints'){
                if (obj != 'UserId') {
                    col = col + '`' + obj + '`, ';
                    val = val + '\'' + req.body[obj] + '\', ';
                };
                if (obj == 'UserId') {
                    col = col + '`IdUser`, ';
                    val = val + '\'' + req.body[obj] + '\', ';
                };
            };

       
            i++;
        };

        //console.log('avant:' + col + ' | ' + val);
        col = col.slice(0, -2) + ')';  // ajout parenthèse de fin
        val = val.slice(0, -2) + ')'; // String - deux derniers caractères : , et [esp]
        
        //console.log('après:' + col + ' | ' + val);

        console.log('col: ' + col + 'val:' + val);
        dbquery.insertOneEntrie(col, table, val)
            .then((resolve) => {
                res.status(200).json({ msg: 'insert commited' });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });
                 
    } else {
        res.status(401).json({ msg: 'invalid token ' });
    };
});





// ---------- update one thread (forum )
router.post('/updateThread', (req, res, next) => {
    res.status(500).send({ 'msg': 'route reached but no treatment yet' });
});
// ----------- create one thread (forum)

router.post('/createThread', (req, res, next) => {
    res.status(500).send({ 'msg': 'route reached but no treatment yet' });
});

// delete thread or delete post ( by id )
router.delete('/delete', (req, res, next) => {
    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = ' `IdUser` = ' + req.body.UserId + ' and `IdThread` = ' + req.body.ThreadId;

        dbquery.deleteOneEntrie(table, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'delete commited', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});
// ---------- dropFile  ( chat )
router.post('/dropFile', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = ' `IdUser` = ' + req.body.UserId + ' and `IdThread` = ' + req.body.ThreadId;
        data = 

        dbquery.updateOneEntrie(table,data, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'delete commited', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };
});
router.post('/deleteFile', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = ' `IdUser` = ' + req.body.UserId + ' and `IdThread` = ' + req.body.ThreadId;
        data = 

        dbquery.updateOneEntrie(table,data, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'delete commited', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };
});
router.post('/getFiles', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Threads";
        condition = ' `IdUser` = ' + req.body.UserId + ' and `IdThread` = ' + req.body.ThreadId;
        data = 

        dbquery.updateOneEntrie(table,data, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'delete commited', data });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };
});



// ----------- create one thread (forum)
module.exports = router;