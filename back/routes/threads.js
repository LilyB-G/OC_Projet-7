const express = require('express');
const router = express.Router();
const date = require('../services/dateTime');
const dbquery = require('../services/dbAction');
const db = require('../services/dbConnection');
require('bluebird');

function auth() {
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

router.post('/chat/all', (req, res, next) => {

    if (auth().tokenid.length > 0) {

        const table = "Threads";
        condition = '= 1 order by DateCreation limit 25 desc'; // toutes les ligne de la table thread

        dbquery.getEntries(table, condition)
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
// get one post
router.post('/chat/one', (req, res, next) => {

    if (auth().tokenid.length > 0) {

        const table = "Threads";
        condition = 'UserPassword = ' + "'" + decoded.tokenid + "'"; // id créé avec tokenid = hashed userPassword
        col = '??';
        dbquery.getOneEntrie(col,table, condition)
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
router.post('/updatePost', (req, res, next) => {
   
    if (auth().tokenid.length > 0) {

        const table = "Threads";
        condition = 'UserId = ' + req.body.UserId ; // id créé avec tokenid = hashed userPassword
        data = '';
        dbquery.updateOneEntrie(table,data, condition)
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

// ----------- create one post
router.post('/createPost', (req, res, next) => {

    if (auth().tokenid.length > 0) {

        const table = "Threads";
        value = '??';
        col = '??';
        dbquery.insertOneEntrie(col,table,value)
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
    if (auth().tokenid.length > 0) {

        const table = "Threads";
        condition = '??';
        
        dbquery.deleteOneEntrie(table,condition)
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

module.exports = router;