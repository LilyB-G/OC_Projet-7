const express = require('express');
const router = express.Router();
const date = require('../services/dateTime');
const dbquery = require('../services/dbAction');
const db = require('../services/dbConnection');
require('bluebird');

router.post('/ini',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/sendpost:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/thread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/newthread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.put('/updatethread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.delete('/deletethread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );

module.exports = router;