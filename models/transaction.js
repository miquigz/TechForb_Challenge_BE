const mongoose = require('mongoose');

const TransactionSCHEMA = new mongoose.Schema({
    toCBU:{
        type: String,
        required: true,
    },
    fromCBU:{
        type:String,
        required:true
    },
    fromCBUfullname:{
        type: String,
        trim: true
    },
    toCBUfullname:{
        type: String,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    state:{
        type: String,
        required: true,
        enum: ['ACCEPTED', 'REJECTED', 'PENDING']
    },
    reason:{
        type: String,
        required: false,
        trim: true
    }
});
module.exports = mongoose.model('Transaction', TransactionSCHEMA);