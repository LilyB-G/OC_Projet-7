const express = require('express'); //Importation du package Express
const cors = require('cors');
const path = require('path'); //Importation de 'path' pour définir les chemins
const morgan = require('morgan'); //middleware qui enregistre les requests
require('dotenv').config(); // charger variables env
const connection = require('./services/dbConnection'); // module mysql et connection BDD
const userRoute = require('./routes/users'); //importation du router "users"

const app = express(); //Appel de la méthode Express
morgan.token('body', (req => JSON.stringify(req.body)));

app.use(morgan(':url :method :body '));

app.use(express.urlencoded({ extended: true }));//add this before any route or before using req.body

if (connection)
{ console.log('Database is connected successfully !');
};

app.use(express.json());

app.use('/', cors());
app.options('*', cors());

// Gestion des routes
app.use('/auth', userRoute);

//dossier images
app.use('/images', express.static(path.join(__dirname, '/public/images')));

app.get('/status', (req,res)=> {
    res.send({
        message: 'backend server Groupomania Online'
    })
})


//exportation de la constante app
module.exports = app;