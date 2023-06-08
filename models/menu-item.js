const mongoose = require('mongoose');

const MenuItemSCHEMA = new mongoose.Schema({
    path:{
        type: String,
        required: true,
    },
    icon:{
        type:String,
        required:true
    },
    title:{
        type: String,
        required: true,
        trim: true
    }
});
module.exports = mongoose.model('MenuItem', MenuItemSCHEMA);