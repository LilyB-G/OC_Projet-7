//Importation du router d'Express
const express = require('express');
const router = express.Router();

//Importation des Middleware 'auth' et 'multer'
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//Importation des controllers
const threadCtrl = require('../controllers/thread');


//Select All définition des Routers
router.get('/', auth, threadCtrl.getAllThread);
//Create
router.post('/', auth , multer , threadCtrl.createThread);
//Select One
router.get('/:id', auth , threadCtrl.selectThread);
//Update
router.put('/:id', auth , multer, threadCtrl.updateThread);
//Delete
router.delete('/:id', auth , threadCtrl.deleteThread);

router.post('/:id/like' , auth, threadCtrl.functionlike);

//Exportation des Routers
module.exports = router;