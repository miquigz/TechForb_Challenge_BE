const express = require('express');

const app = express();

const port = 3000; // Puedes elegir el número de puerto que desees
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});