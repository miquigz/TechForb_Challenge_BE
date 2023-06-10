const apiv1 = '/api/v1';
require('dotenv').config();
const DB = require('./config/db');
const cors = require('cors');

DB();

const express = require('express');
const routerAuth = require('./routes/auth.routes');
const routerMenuItem = require('./routes/menu-item.routes');
const routerTransaction = require('./routes/transaction.routes');
const routerExtraction = require('./routes/extraction.routes');
const exceptionHandler = require('./middlewares/exception');
const app = express();

//Middlewares
app.use(cors()); //allow all domains: access to the API (only dev)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//Routes
app.use(`${apiv1}/auth` ,routerAuth);
app.use(`${apiv1}/menu-item`, routerMenuItem);
app.use(`${apiv1}/transaction`, routerTransaction);
app.use(`${apiv1}/extraction`, routerExtraction);


app.use(exceptionHandler);
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});