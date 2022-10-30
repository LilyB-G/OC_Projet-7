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

router.post('/getparams', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "Params";
        condition = ' 1 order by `Id` '; // toutes les ligne de la table Params

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

router.post('/setDroits', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {

        const table = "DroitsUser";
        let Array = req.body.arrayActionDroit;
        let toCompareArray = [];
        let resStatus = '';

        let condition = '`IdUser` = ' + req.body.IdUser + ' and `NiveauDroit` =  \'' + req.body.NiveauDroit + '\'';
        dbquery.getEntries(table, condition)
            .then((result) => {
                for (let item of result) {
                    toCompareArray.push(item.ActionDroit);
                };
                // valeurs provenant du front comparées aux valeurs provenant de la base

                let Filtered = Array.filter((r) => toCompareArray.indexOf(r) == -1); // on cherche les valeurs non communes ( indexOf non trouvé == -1 )
                console.log(Filtered);
                if (Filtered.length > 0) {
                    // insert new value
                    for (let action of Filtered) {
                        //console.log (action);

                        const data = {
                            IdUser: req.body.IdUser,
                            ActionDroit: action,
                            NiveauDroit: req.body.NiveauDroit,
                        };

                        dbquery.InsertOrUpdateEntries(table, data)
                            .then(() => {
                                resStatus = 'Insert success of ActionDroit :' + data.ActionDroit;

                            })
                            .catch((reject) => {
                                
                                resStatus = 'select return with error: ' + reject ;
                            });
                    };
                };
                // vider Filtered
                Filtered = [];
                // valeurs provenant de la base comparées aux valeurs provenant du front

                Filtered = toCompareArray.filter((r) => Array.indexOf(r) == -1); // on cherche les valeurs non communes ( indexOf non trouvé == -1 ) 
                console.log(Filtered);
                if (Filtered.length > 0) {
                    // dans ce cas il y a plus de valeurs dans la base que de valeurs provenant du front => delete value
                    for (let action of Filtered) {
                        let condition = "`IdUser`= " + req.body.IdUser + " and `ActionDroit` = \'" + action + "\'";
                        dbquery.deleteOneEntrie(table, condition)
                            .then((result) => {
                                resStatus = 'delete success of line :' + req.body.IdUser + ', action: ' + action;
                            })
                            .catch((reject) => {
                                resStatus = 'select return with error:' + reject;
                            });
                    };
                };

                if (resStatus.includes('error:')) {
                    res.status(400).json({ 'msg': resStatus });
                }
                else {

                    res.status(200).json({ 'msg': resStatus });
                }

            })
            .catch((error) => {
                res.status(500).json({ 'msg': 'error mysql: ' + error })
                console.log(error);
            });

    } else {
        res.status(401).json({ 'msg': 'invalid token ' });
    };

});


// ------------------------ update Admi_view

router.post('/updatetable', (req, res, next) => {

    if (auth(req).tokenid.length > 0) {
        console.log('auth: ok');
        const droitInsert = [];
        const array = Object.keys(req.body);
        //console.log(array);
        for (member of array) {
            //console.log (member);
            const permList = ['IdUser', 'ActionDroit', 'NiveauDroit', 'AllowSuppr', 'AllowChange'];

            if (permList.includes(member)) {
                // action update sur DroitsUser
                console.log(member);
                droitInsert.push(member, req.body[member]);

            };
            const userList = ['UserLogin', 'UserService', 'UserRole', 'UserMailPro'];
            if (userList.includes(member)) {
                // action update sur Users
                console.log(member + ' | ' + req.body[member]);
                const querryString = 'Update `Users` Set `' + member + '` = \'' + req.body[member] + '\' WHERE UserId = ' + req.body.UserId + ' ;';

                console.log('querry: ' + querryString);
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
        if (droitInsert.length > 0) {
            console.log(droitInsert);
            const keys = [];
            const values = [];

            for (let index in droitInsert) {
                if (index % 2 == 0) {

                    keys.push('\`' + droitInsert[index] + '\`');
                } else {
                    if (Number.isInteger(droitInsert[index])) {

                        values.push(droitInsert[index]);
                    } else {
                        values.push('\'' + droitInsert[index] + '\'');
                    }

                };

            };

            const querryString = 'Insert Ignore into `DroitsUser`(' + keys + ') values( ' + values + ');';

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
    } else {

        res.status(401).json({ msg: 'invalid token ' });
    };

});


module.exports = router;