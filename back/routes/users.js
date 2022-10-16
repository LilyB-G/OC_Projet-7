const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/dbConnection');
const date = require('../services/dateTime');
require('bluebird');
const dbquery = require('../services/dbAction');



// -------------------------------------------- SIGNUP NEW USER ---------------------------------------------------------

//new user Signup (POST)
router.post('/signup', (req, res, next) => {

    table = 'Users';
    condition = 'LOWER(UserMailPro) = LOWER(' + db.escape(req.body.email) + ')';
    let password = req.body.password;

    dbquery.getEntries(table, condition)
        .then(result => {
            try {
                if (result[0].UserMailPro.length > 0) {

                    res.status(401).json('MailPro déja enregistré');

                }
            }
            catch (error) {

                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(401).json('Unable to hash password');
                    } else {

                        const table = 'Users';
                        const col = '(UserLogin,UserPassword,UserMailPro)';
                        const value = '(' + db.escape(req.body.name) + ',' + db.escape(hash) + ',' + db.escape(req.body.email) + ')';
                        const token = jwt.sign({ id: hash }, 'the-super-strong-secret', { expiresIn: '24h' });
                        try {
                            const insertVal = insertOneEntrie(col, table, value);

                            if (insertVal) {
                                const table = 'Users';
                                const condition = '`UserMailPro`= ' + db.escape(req.body.email) + ' and ' + '`UserPassword`= ' + db.escape(hash);
                                dbquery.getEntries(table, condition)
                                    .then(result => {
                                        //{ msg: 'Logged in!', token: token , userData: resultGetOne[0] , expiresIn: 28800 }
                                        res.status(200).json({ msg: 'User created', token: token, userData: result[0], expiresIn: 28800 });
                                    })
                                    .catch(error => {
                                        res.status(400).json('Sql select user fail');
                                    });

                            } else {
                                res.status(500).json({ ErrorSql: 'Bdd Error' });
                            }
                        } catch (error) { return res.status(500).json('Error connection'); };

                    }

                });

            }

        });
});

// -------------------------------------------- LOGIN EXISTANT USER ---------------------------------------------------------

//Existant user login (POST)
router.post('/login', (req, res, next) => {

    table = 'Users';
    condition = '`UserMailPro` =' + db.escape(req.body.email);

    dbquery.getEntries(table, condition)
        .then(result => {

            // check password
            bcrypt.compare(req.body.password, result[0].UserPassword, function (bErr, bResult) {
                console.log(bErr + " | " + bResult);
                if (bResult) {

                    const token = jwt.sign({ tokenid: result[0].UserPassword }, 'the-super-strong-secret', { expiresIn: '24h' });

                    table = 'Users';
                    data = '`UserLastLogin` = \'' + date.yearMonthDateTime() + '\'';
                    condition = '`UserPassword` = \'' + result[0].UserPassword + '\'';

                    dbquery.updateOneEntrie(table, data, condition);

                    col = '`UserId`,`UserLastLogin`,`UserRole`';
                    table = 'Users';
                    condition = '`UserId` = ' + result[0].UserId;
                    dbquery.getOneEntrie(col, table, condition)
                        .then(resultGetOne => {
                            res.status(200).json({ msg: 'Logged in!', token: token, userData: resultGetOne[0], expiresIn: 28800 })
                        })


                        .catch(error => {
                            res.status(500).json('Fail to connect');


                        });
                }
                else {
                    // wrong password

                    res.status(401).json('password don\'t match');

                }
            }

            )
        })
        .catch(err => {
            console.log(err);
            res.status(401).json('Wrong Email');

        })
        ;
});





// --------------------------------------- GET USER from token  ---------------------------------------------

//Existant user Get
router.post('/getuser', (req, res, next) => {
    //console.log ('route to user');

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

    if (decoded.tokenid.length > 0) {

        let table = 'Users';
        let condition = 'UserPassword = ' + "'" + decoded.tokenid + "'"; // id créé avec tokenid = hashed userPassword
        //console.log (condition);

        dbquery.getEntries(table, condition)
            .then((resolve) => {
                const data = resolve[0];
                res.status(200).json({ msg: 'select returned', data  });

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'select return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});

// --------------------------------------- update USER from token  ---------------------------------------------

//Existant user Get
router.post('/updateuser', (req, res, next) => {
    //console.log ('route to user');

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

    if (decoded.tokenid.length > 0) {

        let table = 'Users';
        let condition = 'UserPassword = ' + "'" + decoded.tokenid + "'"; // id créé avec tokenid = hashed userPassword
        console.log('req.body :' + req.body);
        let data = '';
        let i = 0;

        for (let obj in req.body) {
            let col = obj;
            let val = req.body[obj];
            
            if (i > 0 ) {
                
                data = data + ' , ';
            }     

            data =  data + '\`' + col + '\`' + " = " + '\''+ val + '\'' ; 
            i++;
            
        }
        //console.log ('data: ' + data);
        
        dbquery.updateOneEntrie(table, data, condition)
            .then((resolve) => {
                res.status(200).json({ msg: 'update fetch'});

            })
            .catch((reject) => {
                res.status(400).json({ msg: 'update return with error: ' + reject });
            });


    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});


module.exports = router;