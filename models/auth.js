const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSCHEMA = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    documentType:{
        type: String,
        required: true,
    },
    documentNumber:{
        type: Number,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    currency:{
        type: Number,
        default: 0
    },
    cbu: {
        type: String,
        default: shortid.generate,
        unique: true,
    },
},
{
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('User', UserSCHEMA);