const express = require('express');
const router = express.Router();
const date = require('../services/dateTime');
const dbquery = require('../services/dbAction');
const db = require('../services/dbConnection');
require('bluebird');

router.post('/ini',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/createPost:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/updatePost:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/updateThread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.post('/CreateThread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );
router.delete('/deletethread:idowner',(req, res, next) => {
    res.status(200).send({'msg':'route reached'});
} );

module.exports = router;