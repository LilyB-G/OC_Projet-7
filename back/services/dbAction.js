const connection = require('../services/dbConnection');

exports.getEntries = function(table, condition) {
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
exports.getOneEntrie= function(col, table, condition) {
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
exports.insertOneEntrie = function(col, table, value) {
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

exports.updateOneEntrie= function(table, data, condition) {
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

exports.deleteOneEntrie= function(table, condition) {
    return new Promise((resolve, reject) => {
        let queryString = "Delete from`" + table + " where " + condition + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
};

