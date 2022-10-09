const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { resolveDirective } = require('vue');
const date = require('../services/dateTime');
const dbquery = require('../services/dbAction');
const connection = require('../services/dbConnection');

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
// ------------------ get all Admin_view

router.post('/gettable', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "admin_view";
        condition = ' 1 order by `UserId` '; // toutes les ligne de la view Admin_view

        dbquery.getViewEntries(table, condition)
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

// ------------------------ update Admi_view

router.post('/updatetable', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {
        console.log('auth: ok');

        const array = Object.keys(req.body);
        //console.log(array);
        for (member of array) {
            //console.log (member);
            if (member in ['ActionDroit', 'NiveauDroit', 'AllowSuppr', 'AllowChange']) {
                // action update sur DroitsUser
                console.log(member);
                const querryString = 'Update `DroitsUser` Set `' + member + '` = \'' + req.body[member] + '\' WHERE IdUser = ' + req.body.UserId + '\' ;';

                console.log(querryString);
                connection.query(querryString, function (err, result) {
                    if (result) {
                        console.log(result);
                        res.status(200).json({ msg: 'update ok' });

                    };
                    if (err) {
                        console.log(err);
                        res.status(400).json({ msg: 'update return with error: ' + err });
                    };
                });

            };
            if (member in ['UserLogin', 'UserService', 'UserMailPro']) {
                // action update sur Users
                console.log (member);
                const querryString = 'Update `Users` Set `' + member + '` = \'' + req.body[member] + '\' WHERE UserId = ' + req.body.UserId + '\' ;';

                console.log(querryString);
                connection.query(querryString, function (err, result) {
                    if (result) {
                        console.log(result);
                        res.status(200).json({ msg: 'update ok' });

                    };
                    if (err) {
                        console.log(err);
                        res.status(400).json({ msg: 'update return with error: ' + err });
                    };
                });


            };
        };
    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});


module.exports = router;