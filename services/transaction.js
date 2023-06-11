const Transaction = require('../models/transaction');
const User = require('../models/auth');
const { updateUserCurrency } = require('./auth');
const { filterTransactionsByMonth, filterOutcomeTransactions, filterIncomeTransactions
} = require('../helpers/transactionUtils');

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

const transactionsByUserLastMonth = async (cbu) => {
    return await filterTransactionsByMonth(cbu, -1);
}
const transactionsByUserActualMonth = async (cbu) => {
    return await filterTransactionsByMonth(cbu, 0);
}
const compareUserMonthsTransactions = async (cbu, outcome = false) => {
    try {
        if(!cbu) throw new Error('No cbu provided');
        const actualT = await transactionsByUserActualMonth(cbu);
        const lastT = await transactionsByUserLastMonth(cbu);
        if (outcome) {//egreso
            const outcomeActual = filterOutcomeTransactions(actualT, cbu);
            const outcomeLast = filterOutcomeTransactions(lastT, cbu);
            const totalOutcomeActualAmount = outcomeActual.reduce((acc, transaction) => acc + transaction.amount, 0);
            const totalOutcomeLastAmount = outcomeLast.reduce((acc, transaction) => acc + transaction.amount, 0);

            let percentage = totalOutcomeActualAmount / totalOutcomeLastAmount * 100;
            if(percentage > 100)
                percentage = percentage - 100;
            else
                percentage = 100 - percentage;

            return {
                type: 'outcome',
                actualMonthAmount: totalOutcomeActualAmount,
                lastMonthAmount: totalOutcomeLastAmount,
                percentage: percentage,
                actualPossitive: totalOutcomeActualAmount > totalOutcomeLastAmount
            }
        } else {//ingresos
            const incomeActual = filterIncomeTransactions(actualT, cbu);
            const incomeLast = filterIncomeTransactions(lastT, cbu);
            const totalIncomeActualMonthAmount = incomeActual.reduce((acc, transaction) => acc + transaction.amount, 0);
            const totalIncomeLastMonthAmount = incomeLast.reduce((acc, transaction) => acc + transaction.amount, 0);

            let percentage = totalIncomeActualMonthAmount / totalIncomeLastMonthAmount * 100;
            if(percentage > 100)
                percentage = percentage - 100;
            else
                percentage = 100 - percentage;
            return {
                type: 'income',
                actualMonthAmount: totalIncomeActualMonthAmount,
                lastMonthAmount: totalIncomeLastMonthAmount,
                percentage: percentage,
                actualPossitive: totalIncomeActualMonthAmount > totalIncomeLastMonthAmount
            }
        }
    } catch (error) {
        throw error;
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