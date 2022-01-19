const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let voucherSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama game harus diisi']    
       },
    status:{
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    thumbnail: {
        type: String,
        
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref:'Category'
    },
    nominals: [{
        type: mongoose.Schema.ObjectId,
        ref:'Nominal'
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
},{timestamp: true})

module.exports = mongoose.model('Voucher', voucherSchema)