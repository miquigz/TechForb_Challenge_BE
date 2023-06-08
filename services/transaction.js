const Transaction = require('../models/transaction');

const getTransactions = async () => {
    try {
        return await Transaction.find();
    } catch (error) {
        throw error;
    }
}

const createTransaction = async (body) => {
    try {
        if (!body) throw new Error('No body data provided');
        return await Transaction.create(body);
    } catch (error) {
        throw error;
    }
}

const deleteTransaction = async (id) => {
    try {
        if(!id) throw new Error('No id provided');
        return await Transaction.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getTransactions,
    createTransaction,
    deleteTransaction
}