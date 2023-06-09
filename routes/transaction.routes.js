const express = require('express');
const routerTransaction = express.Router();

const authMiddleware = require('../middlewares/auth');

const transactionController = require('../controllers/transaction');


routerTransaction.get('/', authMiddleware, transactionController.getTransactions);
routerTransaction.get('/last-month/:cbu', authMiddleware, transactionController.transactionsByUserLastMonth);
routerTransaction.get('/actual-month/:cbu', authMiddleware, transactionController.transactionsByUserActualMonth);
routerTransaction.get('/compare-months/:cbu', authMiddleware, transactionController.compareUserMonthsTransactions);

routerTransaction.post('/', authMiddleware, transactionController.createTransaction);
routerTransaction.delete('/:id', authMiddleware, transactionController.deleteTransaction);


module.exports = routerTransaction;