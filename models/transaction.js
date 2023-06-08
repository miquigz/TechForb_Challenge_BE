const mongoose = require('mongoose');

const MenuItemSCHEMA = new mongoose.Schema({
    toCBU:{
        type: String,
        required: true,
    },
    fromCBU:{
        type:String,
        required:true
    },
    amount:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    reason:{
        type: String,
        required: false,
        trim: true
    }
});
module.exports = mongoose.model('MenuItem', MenuItemSCHEMA);