const express = require('express');
const routerAuth = express.Router();

const authController = require('../controllers/auth');

routerAuth.post('/register', authController.createUser);
routerAuth.post('/login', authController.loginUser);

routerAuth.get('/validate-token/:token', authController.validateToken);
routerAuth.get('/search-user/:dni', authController.searchUserByDNI);

module.exports = routerAuth;