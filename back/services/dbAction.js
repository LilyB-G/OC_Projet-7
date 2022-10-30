const connection = require('../services/dbConnection');

exports.getEntries = function (table, condition) {
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
exports.getJoinEntries = function (table1,table2, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "SELECT * FROM `" + table1 + "` inner join `" + table2 + "` ON " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);

            }

            resolve(result);
        });
    });
};

exports.getViewEntries = function (view, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "SELECT `" + view + "`.* FROM `" + view + "` WHERE " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);

            }

            resolve(result);
        });
    });
};
exports.getOneEntrie = function (col, table, condition) {
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


exports.insertOneEntrie = function (col, table, value) {
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

exports.updateOneEntrie = function (table, data, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "Update `" + table + "` set " + data + " where " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};

exports.InsertOrUpdateEntries = function (table, data) {
    return new Promise((resolve, reject) => {
        let keys = '';
        let values = '';

        //console.log(data);

        for (let obj in data) {
            //console.log(obj);

            if (keys.length > 0) {
                keys = keys + ',' + obj;
            } else {
                keys = obj;
            };
            if (values.length > 0) {
                values = values + ',\'' + data[obj] + '\'';
            } else {
                if (typeof data[obj] != String) {
                    values = String(data[obj]);    // cas de IdUser (Number) si passé en premier => cause une erreur
                } else {
                    values = '\'' + data[obj] + '\'';
                }

            };

        };

        //console.log(keys + ' | ' + values);
        let queryString = '';

        queryString = "Insert Ignore into `" + table + "`(" + keys + ") Values (" + values + ")" + ";";

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};


exports.deleteOneEntrie = function (table, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "Delete from`" + table + "` where " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });

    });
};

