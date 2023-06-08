require('dotenv').config();
const express = require('express');
const DB = require('./config/db');
const mongoose = require('mongoose');

DB();

const app = express();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});