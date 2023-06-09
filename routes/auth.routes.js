const express = require('express');
const routerAuth = express.Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

routerAuth.post('/register', authController.createUser);
routerAuth.post('/login', authController.loginUser);

routerAuth.get('/validate-token/:token', authController.validateToken);
routerAuth.get('/search-user/:dni', authController.searchUserByDNI);
routerAuth.get('/me', authMiddleware ,authController.getUserInfo);

module.exports = routerAuth;