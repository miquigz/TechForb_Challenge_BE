const Transaction = require('../models/transaction');
const User = require('../models/auth');
const { updateUserCurrency } = require('./auth');

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
        const fromUser = await User.findOne({ cbu: body.fromCBU});
        const toUser = await User.findOne({ cbu: body.toCBU});
        if(!fromUser) throw new Error('From user CBU not found');
        if(!toUser) throw new Error('To user CBU not found');
        if(fromUser.currency < body.amount) throw new Error('Insufficient funds');
        await updateUserCurrency(fromUser._id, fromUser.currency - body.amount);
        await updateUserCurrency(toUser._id, toUser.currency + body.amount);
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