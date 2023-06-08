const express = require('express');
const routerTransaction = express.Router();

const authMiddleware = require('../middlewares/auth');

const transactionController = require('../controllers/transaction');


routerTransaction.get('/', authMiddleware, transactionController.getTransactions);
routerTransaction.post('/', authMiddleware, transactionController.createTransaction);
routerTransaction.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = routerTransaction;