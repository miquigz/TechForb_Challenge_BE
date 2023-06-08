const express = require('express');
const routerMenuItem = express.Router();

const menuItemController = require('../controllers/menu-item');
const authMiddleware = require('../middlewares/auth');

routerMenuItem.get('/', authMiddleware, menuItemController.getMenuItem);
routerMenuItem.post('/', authMiddleware, menuItemController.createMenuItem);
routerMenuItem.delete('/:id', authMiddleware, menuItemController.deleteMenuItem);

module.exports = routerMenuItem;
