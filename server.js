const apiv1 = '/api/v1';
require('dotenv').config();
const DB = require('./config/db');

DB();

const express = require('express');
const routerAuth = require('./routes/auth.routes');
const exceptionHandler = require('./middlewares/exception');
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//Routes
app.use(`${apiv1}/auth` ,routerAuth);








app.use(exceptionHandler);
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});