const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../services/dbConnection');
const connection = require('../services/dbConnection');
const date = require('../services/dateTime');
require('bluebird');


function getEntries(table, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "SELECT * FROM `" + table + "` WHERE " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);

            }

            resolve(result);
        });
    });
};
function getOneEntrie(col, table, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "SELECT " + col + " FROM `" + table + "` WHERE " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};
function insertOneEntrie(col, table, value) {
    return new Promise((resolve, reject) => {
        let queryString = "INSERT into `" + table + '` ' + col + " VALUES " + value + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};

function updateOneEntrie(table, value, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "Update `" + table + "` set " + value + " where " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};

// -------------------------------------------- SIGNUP NEW USER ---------------------------------------------------------

//new user Signup (POST)
router.post('/signup', (req, res, next) => {

    table = 'Users';
    condition = 'LOWER(UserMailPro) = LOWER(' + db.escape(req.body.email) + ')';
    let password = req.body.password;

    getEntries(table, condition)
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
                        const token = jwt.sign({ id: hash }, 'the-super-strong-secrect', { expiresIn: '24h' });
                        try {
                            const insertVal = insertOneEntrie(col, table, value);

                            if (insertVal) {
                                const table = 'Users';
                                const condition = '`UserMailPro`= ' + db.escape(req.body.email) + ' and ' + '`UserPassword`= ' + db.escape(hash);
                                getEntries(table, condition)
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

    getEntries(table, condition)
        .then(result => {
            
            // check password
            bcrypt.compare(req.body.password, result[0].UserPassword, function (bErr, bResult) {
                console.log(bErr + " | " + bResult);
                if (bResult) {

                    const token = jwt.sign({ id: result[0].UserPassword }, 'the-super-strong-secrect', { expiresIn: '24h' });

                    table = 'Users';
                    let timeStamp = "'" + date.yearMonthDateTime() + "'";
                    value = '`UserLastLogin` = ' + timeStamp;
                    condition = '`UserId` = ' + result[0].UserId;

                    updateOneEntrie(table, value, condition);

                    col = '`UserId`,`UserLogin`,`UserService`,`UserMailPro`,`UserMailPerso`,`UserRue`,`UserCodePostal`,`UserVille`,`UserPhonePro`,`UserPhonePerso`,`UserAvatar`,`UserThreadAbo`,`UserLastLogin`';
                    table = 'Users';
                    condition = '`UserId` = ' + result[0].UserId;
                    getOneEntrie(col, table, condition)
                        .then(resultGetOne => {
                            res.status(200).json({ msg: 'Logged in!', token: token , userData: resultGetOne[0] , expiresIn: 28800 })
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





// --------------------------------------- GET USER from ID (en chantier) ---------------------------------------------

//Existant user Get
router.get('/user:id', (req, res, next) => {


    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return {
            message: "Providing the token",
        };
    }

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secret');

    db.query('SELECT * FROM Users where id=?', decoded.id, function (error, results, fields) {
        if (error) return error;
        return { error: false, data: results[0], message: 'Fetch Successfully.' };
    });


});

module.exports = router;