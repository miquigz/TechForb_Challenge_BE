const Transaction = require('../models/transaction');

const filterTransactionsByMonth = async (cbu, monthOffset) => {
    try {
        if (!cbu) throw new Error('No cbu provided');
        const transactions = await Transaction.find({ $or: [{ fromCBU: cbu }, { toCBU: cbu }] });
        // console.log('trans:', transactions)
        const today = new Date();
        const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset);//desplazamiento
        console.log(targetDate)
        
        return transactions.filter(transaction => {
            const dateTransaction = new Date(transaction.createdAt);//para tener las propiedades del obj Date, sino es un string
            return ( 
            dateTransaction.getMonth() === targetDate.getMonth() &&
            dateTransaction.getFullYear() === targetDate.getFullYear()
            );
        });
    } catch (error) {
        throw error;
    }
}

const filterOutcomeTransactions = (transactions, cbu)=> transactions.filter(transaction => transaction.fromCBU === cbu);
const filterIncomeTransactions = (transactions, cbu) => transactions.filter(transaction => transaction.toCBU === cbu);

module.exports = {
    filterTransactionsByMonth,
    filterOutcomeTransactions,
    filterIncomeTransactions
}