const Transaction = require('../models/transaction');

const filterTransactionsByMonth = async (cbu, monthOffset) => {
    try {
        if (!cbu) throw new Error('No cbu provided');
        const transactions = await Transaction.find({ $or: [{ fromCBU: cbu }, { toCBU: cbu }] });
        const today = new Date();
        const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset);
        
        return transactions.filter(transaction => {
        const dateTransaction = new Date(transaction.date);
        return (
            dateTransaction.getMonth() === targetDate.getMonth() &&
            dateTransaction.getFullYear() === targetDate.getFullYear()
        );
    });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    filterTransactionsByMonth
}