const Transaction = require('../models/transaction');

const transactionService = require('../services/transaction');

const getTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        throw error;
    }
}

const createTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(200).json(transaction);
    } catch (error) {
        throw error;
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransaction(req.params.id);
        res.status(200).json(transaction);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getTransactions,
    createTransaction,
    deleteTransaction
}





