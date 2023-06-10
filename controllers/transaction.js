const transactionService = require('../services/transaction');

const getTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

const createTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.deleteTransaction(req.params.id);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

const transactionsByUserLastMonth = async (req, res, next) => {
    try {
        const transactions = await transactionService.transactionsByUserLastMonth(req.params.cbu);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

const transactionsByUserActualMonth = async (req, res, next) => {
    try {
        const transactions = await transactionService.transactionsByUserActualMonth(req.params.cbu);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

const compareUserMonthsTransactions = async (req, res, next) => {
    try {
        console.log(req.query.outcome)
        const transactions = await transactionService.compareUserMonthsTransactions(req.params.cbu, req.query.outcome);
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTransactions,
    createTransaction,
    deleteTransaction,
    transactionsByUserLastMonth,
    transactionsByUserActualMonth,
    compareUserMonthsTransactions
}





